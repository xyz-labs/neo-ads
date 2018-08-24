from boa.interop.Neo.Storage import Get, Put, GetContext
from boa.interop.Neo.Runtime import GetTrigger,CheckWitness,Log,Notify,Serialize,Deserialize,GetTime
from boa.interop.Neo.TriggerType import Application,Verification
from boa.builtins import concat, sha1

OWNER = b'#\xba\'\x03\xc52c\xe8\xd6\xe5"\xdc2 39\xdc\xd8\xee\xe9'

SECONDS_IN_DAY = 86400

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
        
        elif operation == 'viewUserPublications':

            return ViewUserPublications(args)

        elif operation == 'placeBid':

            return PlaceBid(args)

        elif operation == 'viewWinningBid':

            return ViewWinningBid(args)

        elif operation == 'viewFunds':
            return ViewFunds(args)

        elif operation == 'withdraw':
            return Withdraw(args)

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

    publications = Get(context, publications_key)
    
    # Check if user has publications already
    if publications:
        publications = Deserialize(publications)
    else:
        publications = []

    first_date = GetTime() + (SECONDS_IN_DAY - GetTime() % SECONDS_IN_DAY)

    new_publication = [name, url, category, first_date]
    publications.append(name)

    publication_key = concat(publications_key, sha1(name)) # Publication details - sha1 to prevent malicious input

    Put(context, publication_key, Serialize(new_publication))
    Put(context, publications_key, Serialize(publications))

    return [True, '']

def ViewUserPublications(args):
    return [True, '']

def PlaceBid(args):
    return [True, '']

def ViewWinningBid(args):
    return [True, '']

def ViewFunds(args):
    return [True, '']

def Withdraw(args):
    return [True, '']