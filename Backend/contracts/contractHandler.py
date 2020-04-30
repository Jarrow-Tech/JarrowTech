import pyrebase
import datetime

from collections import OrderedDict

config = {
    "apiKey": "AIzaSyCW8jXAWYtTZetKkMo8w7XEZGMlXyQkh-g",
    "authDomain": "jarrowchain.firebaseapp.com",
    "databaseURL": "https://jarrowchain.firebaseio.com",
    "projectId": "jarrowchain",
    "storageBucket": "jarrowchain.appspot.com",
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

# called to create a new contract
# takes nothing
# returns the hash used as the contract address
def createNewContract():
    createTime = datetime.datetime.now()
    contractAddress = str(hash(createTime))
    db.child('Contracts').child(contractAddress).set({"objects": 1})
    db.child('Contracts').child(contractAddress).child('0').set({
        "time": str(createTime),
        "grower": "None",
        "owner": "TestUID",
        "cropSize": 0,
        "hempState": "None",
        "state": {
            "planted": False,
            "harvested": False,
            "inTransit": False,
            "delivered": False,
            "tested": False,
            "validated": False
        }
    })
    generateObjectHash(contractAddress, '0')
    return contractAddress

# called to register a plant event
# takes the contract and the UID
def plant(contractAddress, uid):
    objects = db.child('Contracts').child(contractAddress).child('objects').get().val()
    lastContract = db.child('Contracts').child(contractAddress).child(str(objects -1))
    print(contractAddress)
    if not lastContract.child('state').child('planted').get().val():
        db.child('Contracts').child(contractAddress).child(str(objects)).set({
            "time": str(datetime.datetime.now()),
            "grower": str(uid),
            "owner": str(uid),
            "cropSize": 0,
            "hempState": "Upped",
            "state": {
                "planted": True,
                "harvested": False,
                "inTransit": False,
                "delivered": False,
                "tested": False,
                "validated": False
            }
        })
        db.child('Contracts').child(contractAddress).update({"objects": objects + 1})
    generateObjectHash(contractAddress, str(objects - 1))
    return

# # called to register a harvest event
# # takes the contract, the UID, and the crop size
# def harvest(contractAddress, uid, cropSize):
#     # if not harvested and uid is plantedUid
#     objects = db.child('Contracts').child(contractAddress).child('objects').get().val()
#     owner = db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('owner').get().val()
#     # one of these isn't true
#     if ((not db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('harvested').get().val()) and (owner == uid)):
#         db.child('Contracts').child(contractAddress).child(str(objects)).set({
#             "time": str(datetime.datetime.now()),
#             "grower": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('grower').get().val()),
#             "owner": str(uid),
#             "cropSize": str(cropSize),
#             "hempState": "None",
#             "state": {
#                 "planted": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('planted').get().val(),
#                 "harvested": True,
#                 "inTransit": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('inTransit').get().val(),
#                 "delivered": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('delivered').get().val(),
#                 "tested": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('tested').get().val(),
#                 "validated": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('validated').get().val()
#             }
#         })
#         # update the number of objects
#         db.child('Contracts').child(contractAddress).update({"objects": objects + 1})
#     generateObjectHash(contractAddress, str(objects - 1))
#     return

def harvest(contractAddress, uid, cropSize):
    objects = db.child('Contracts').child(contractAddress).child('objects').get().val()
    lastContract = db.child('Contracts').child(contractAddress).child(str(objects -1))
    print(contractAddress)
    if True:
        try:
            db.child('Contracts').child(contractAddress).child(str(objects)).set({
                "time": str(datetime.datetime.now()),
                "grower": str('hello'),
                "owner": str(uid),
                "cropSize": 0,
                "hempState": "Stuff",
                "state": {
                    "planted": True,
                    "harvested": False,
                    "inTransit": False,
                    "delivered": False,
                    "tested": False,
                    "validated": False
                }
            })
        except Exception as e:
            print(e)
        db.child('Contracts').child(contractAddress).update({"objects": objects + 1})
    generateObjectHash(contractAddress, str(objects - 1))
    return

# called to scan a contract
# takes the contract, the UID
def scan(contract, uid):
    # return a list with each state in the contract [0..n]
    return

# called to transfer ownership of a contract from one UID to another
# takes the contract, the current UID, and the next UID
def transferOwnership(contractAddress, uid, nextUid):
    objects = db.child('Contracts').child(contractAddress).child('objects').get().val()
    lastContract = db.child('Contracts').child(contractAddress).child(str(objects - 1))
    if lastContract.child('owner') is uid:
    # if uid has ownership
        lastState = lastContract.get().val()
        lastState['owner'] = nextUid
        # update owner with nextUid
        # update the state
    # hash contract
    # store hash
    return

# called to attach a CoA to the contract
# takes the contract, a UID, and a CoA
def addCoa(contract, uid, coa):
    # if uid has ownership and is technician
        # update coa
        # update the state
    # hash contract
    # store hash
    return

# called to validate the CoA on a contract
# takes the contract, and the UID of the validating user
def validateCoa(contract, uid):
    # if tested
        # update validated state
    # hash contract
    # store hash
    return

# called to update the state of the hemp
# takes the contract, UID, and a string describing the new state
def manufacture(contract, uid, newHempState):
    # if uid has ownership
        # update hempState
    # hash contract
    # store hash
    return

# make the hash object that can later be used to validate a contract's authenticity
# takes the contract and the number of the state
def generateObjectHash(contract, num):
    hashableObject = db.child('Contracts').child(contract).child(num).get().val()
    hashableObject = dict(hashableObject)
    o = ''
    o += str(hashableObject['cropSize'])
    o += str(hashableObject['grower'])
    o += str(hashableObject['owner'])
    o += str(hashableObject['hempState'])
    o += str(hashableObject['time'])
    db.child('Contracts').child(contract).child('hash' + num).set({"hash": str(hash(o))})
    return
