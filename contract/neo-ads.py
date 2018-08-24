from boa.interop.Neo.Storage import Get, Put, GetContext
from boa.interop.Neo.Runtime import GetTrigger,CheckWitness,Log,Notify,Serialize,Deserialize,GetTime
from boa.interop.Neo.TriggerType import Application,Verification
from boa.interop.System.ExecutionEngine import GetScriptContainer, GetExecutingScriptHash
from boa.interop.Neo.Transaction import Transaction, GetReferences, GetOutputs, GetUnspentCoins
from boa.interop.Neo.Output import GetValue, GetAssetId, GetScriptHash
from boa.builtins import concat, sha1, range

OWNER = b'#\xba\'\x03\xc52c\xe8\xd6\xe5"\xdc2 39\xdc\xd8\xee\xe9'

SECONDS_IN_DAY = 86400

MAX = 18446744073709000000
MIN = 100000

OnRefund = RegisterAction('refund', 'addr_to', 'amount')

def Main(operation, args):
    trigger = GetTrigger()

    if trigger == Verification():
        return CheckWitness(OWNER)

    if trigger == Application():
        nargs = len(args)

        if operation == 'createPublication':
            if nargs != 4:
                print('Required arguments: [sender] [name] [url] [category]')
                return [False, '4 arguments required']

            return CreatePublication(args)

        elif operation == 'deletePublication':
            if nargs != 2:
                print('Required arguments: [sender] [name]')
                return [False, '2 arguments required']

            return DeletePublication(args)  
        
        elif operation == 'getUserPublications':
            if nargs != 1:
                print('Required arguments: [user]')
                return [False, '1 arguments required']

            return GetUserPublications(args)

        elif operation == 'getAuctionByMonth':

            return GetAuctionByMonth(args)

        elif operation == 'getAuctionByDay':

            return GetAuctionByDay(args)

        elif operation == 'placeBid':
            if nargs != 5: 
                print('required arguments: [owner] [name] [date] [ad_url] [image_urls]')
                return [False, '5 arguments required']

            return PlaceBid(args)

        elif operation == 'getWinningBid':

            return GetWinningBid(args)

        elif operation == 'getUserFunds':
            if nargs != 1:
                print('Required arguments: [user]')
                return [False, '1 arguments required']

            return GetUserFunds(args)

        elif operation == 'withdrawFunds':
            return WithdrawFunds(args)

    return [False, 'No operation selected']

def CreatePublication(args):
    sender = args[0]
    name = args[1]
    url = args[2]
    category = args[3]

    if not CheckWitness(sender):
        print('Account owner must be sender')
        return [False, 'Account owner must be sender']

    # Add char limit to prevent big storage costs
    if (len(name) > 255 or len(url) > 255 or len(category) > 255):
        print('Args must be less than 255 chars')
        return [False, 'Arguments must be less than 255 chars']

    context = GetContext()

    publications_key = concat('publications', sender)      # Publications by user
    publication_key = concat(publications_key, sha1(name)) # Publication details - sha1 to prevent malicious input

    publications = Get(context, publications_key)
    publication = Get(context, publication_key)
    
    # If publication already exists check if it is active/deleted
    if publication:
        publication = Deserialize(publication)
        if publication[4]:
            print('Publication name currently active')
            return [False, 'Active publication name']
    
    # Check if user has publications already
    if publications:
        publications = Deserialize(publications)
    else:
        publications = []

    first_date = GetTime() + (SECONDS_IN_DAY - GetTime() % SECONDS_IN_DAY)
    is_active = True

    new_publication = [name, url, category, first_date, is_active]
    publications.append(name)

    Put(context, publication_key, Serialize(new_publication))
    Put(context, publications_key, Serialize(publications))

    return [True, '']

def DeletePublication(args):
    sender = args[0]
    name = args[1]

    if not CheckWitness(sender):
        print('Account owner must be sender')
        return [False, 'Account owner must be sender']

    context = GetContext()

    publications_key = concat('publications', sender)
    publication_key = concat(publications_key, sha1(name))

    publication = Get(context, publication_key)
    if not publication:
        print('Publication does not exist')
        return [False, 'Publication does not exist']

    publication = Deserialize(publication)
    if not publication[4]:
        print('Publication has already been deleted')
        return [False, 'Publication has already been deleted']

    """
    Check for active bids etc here - revisit if time (OOS)
    """

    publication[4] = False

    Put(context, publication_key, Serialize(publication))

    return [True, '']

def GetUserPublications(args):
    user = args[0]

    context = GetContext()

    publications_key = concat('publications', user)

    publications = Get(context, publications_key)

    user_publications = []

    if not publications:
        return [True, user_publications]

    publications = Deserialize(publications) 

    # Go through each user publication and get details
    for i in range(0, len(publications)):
        publication_key = concat(publications_key, sha1(publications[i]))
        
        publication = Get(context, publication_key)  
        publication = Deserialize(publication)

        # Append only if publication is active
        if publication[4]:
            user_publications.append(publication)

    return [True, user_publications]

def PlaceBid(args):
    owner = args[0]
    name = args[1]
    date = args[2]
    ad_url = args[3]
    image_urls = args[4]

    context = GetContext()
    time = GetTime(context)
    attachments = get_asset_attachments()

    user = attachments[1]
    bid_amount = attachments[3]

    if date < MIN or date > MAX:
        print('Date must be within bounds')
        return [False, 'Date must be within bounds']

    modulo = date % SECONDS_IN_DAY
    if modulo != 0:
        print('Date must be 00:00')
        return [False, 'Date must be 00:00']

    publications_key = concat('publications', owner)
    publication_key = concat(publications_key, sha1(name))
    publication = Get(context, publication_key)

    if not publication:
        print('Publication does not exist')
        return [False, 'Publication does not exist']

    else:
        publication = Deserialize(publication)

        if not publication[4]: 
            print('Publication is not currently active')
            return [False, 'Publication is not active']

    if time >= date:
        print('Auction has finished')
        return [False, 'Auction finished']

    if bid_amount <= 0:
        print('No NeoGAS has been attached')
        return [False, 'No GAS attached']

    has_claimed = False

    new_bid = [user, bid_amount, ad_url, image_urls, time]
    new_auction = [user, bid_amount, has_claimed]

    auction_key = concat(publication_key, sha1(date))
    bids_key = concat(auction_key, 'bids')
    auction = Get(context, auction_key)

    # If no previous bids automatically accept and store current bid
    if not auction:
        Put(context, auction_key, Serialize(new_auction))
        Put(context, bids_key, Serialize([new_bid]))

        return [True, '']

    auction = Deserialize(auction)

    previous_user = auction[0]
    previous_bid = auction[1]

    if previous_bid >= bid_amount:
        print('Must bid more than the current best bid')
        OnRefund(user, bid_amount)
        return [False, 'Must bid more than current best bid']

    bids = Get(context, bids_key)
    bids = Deserialize(bids)
  
    bids.append(new_bid)

    Put(context, auction_key, Serialize(new_auction))
    Put(context, bids_key, Serialize(bids))

    # Re-credit funds to previous bidder
    AddFunds(context, previous_user, previous_bid)

    return [True, '']

def GetAuctionByMonth(args):

    return [True, '']

def GetAuctionByDay(args):

    return [True, '']

def GetWinningBid(args):
    return [True, '']

def GetUserFunds(args):
    user = args[0]

    context = GetContext()

    funds_key = concat('funds', user)
    funds = Get(context, funds_key)

    return [True, funds]

def AddFunds(context, user, amount):
    funds_key = concat('funds', user)
    funds = Get(context, funds_key)

    new_funds = funds + amount

    Put(context, funds_key, new_funds)

def WithdrawFunds(args):
    return [True, '']

# Retrieved from https://github.com/neonexchange/neo-ico-template/blob/master/nex/txio.py
def get_asset_attachments():
    """
    Gets information about NEO and Gas attached to an invocation TX
    :return:
        list: A list with information about attached neo and gas
    """

    tx = GetScriptContainer()
    references = tx.References

    receiver_addr = GetExecutingScriptHash()
    sender_addr = None
    sent_amount_neo = 0
    sent_amount_gas = 0

    if len(references) > 0:

        reference = references[0]
        sender_addr = reference.ScriptHash
        for output in tx.Outputs:
            if output.ScriptHash == receiver_addr:
                if output.AssetId == neo_asset_id:
                    sent_amount_neo += output.Value
                if output.AssetId == gas_asset_id:
                    sent_amount_gas += output.Value

    return [receiver_addr, sender_addr, sent_amount_neo, sent_amount_gas]