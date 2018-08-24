from boa.interop.Neo.Storage import Get, Put, GetContext
from boa.interop.Neo.Runtime import GetTrigger,CheckWitness,Log,Notify
from boa.interop.Neo.TriggerType import Application,Verification

OWNER = b'#\xba\'\x03\xc52c\xe8\xd6\xe5"\xdc2 39\xdc\xd8\xee\xe9'

def Main(operation, args):
    trigger = GetTrigger()

    if trigger == Verification():
        return CheckWitness(OWNER)

    if trigger == Application():
        if operation == 'createPublication':

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