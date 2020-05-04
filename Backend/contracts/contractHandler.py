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
    # we build the contract address from a hash of the time so that it's a unique value
    createTime = datetime.datetime.now()
    contractAddress = str(hash(createTime))

    # create the first "blank" contract instance
    db.child('Contracts').child(contractAddress).set({"objects": 1})
    db.child('Contracts').child(contractAddress).child('0').set({
        "time": str(createTime),
        "grower": "None",
        "owner": "None",
        "cropSize": 0,
        "hempState": "None",
        "coa": [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
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
    # get required data for logic
    objects = db.child('Contracts').child(contractAddress).child('objects').get().val()
    lastContract = db.child('Contracts').child(contractAddress).child(str(objects -1))

    if not lastContract.child('state').child('planted').get().val():
        # add the new contract state
        # this doesn't require pre generating the data -- i think this is because we aren't pulling anything from the DB, but honestly i don't know
        db.child('Contracts').child(contractAddress).child(str(objects)).set({
            "time": str(datetime.datetime.now()),
            "grower": str(uid),
            "owner": str(uid),
            "cropSize": 0,
            "hempState": "None",
            "coa": [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]],
            "state": {
                "planted": True,
                "harvested": False,
                "inTransit": False,
                "delivered": False,
                "tested": False,
                "validated": False
            }
        })
        # update objects count
        db.child('Contracts').child(contractAddress).update({"objects": objects + 1})

    generateObjectHash(contractAddress, str(objects))
    return

# called to register a harvest event
# takes the contract, the UID, and the crop size
def harvest(contractAddress, uid, cropSize):
    # get required data for logic
    objects = db.child('Contracts').child(contractAddress).child('objects').get().val()
    owner = db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('owner').get().val()

    if ((not db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('harvested').get().val()) and (owner == uid)):
        # construct data object for new contract event
        data = {
            "time": str(datetime.datetime.now()),
            "grower": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('grower').get().val()),
            "owner": str(uid),
            "cropSize": str(cropSize),
            "hempState": "None",
            "coa": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('coa').get().val(),
            "state": {
                "planted": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('planted').get().val(),
                "harvested": True,
                "inTransit": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('inTransit').get().val(),
                "delivered": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('delivered').get().val(),
                "tested": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('tested').get().val(),
                "validated": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('validated').get().val()
            }
        }

        # push new contract state
        db.child('Contracts').child(contractAddress).child(str(objects)).set(data)
        # update the number of objects
        db.child('Contracts').child(contractAddress).update({"objects": objects + 1})

    generateObjectHash(contractAddress, str(objects))
    return

# called to scan a contract
# takes the contract, the UID
def scan(contractAddress, uid):
    # return a list with each state in the contract [0..n]
    objects = db.child('Contracts').child(contractAddress).child('objects').get().val()
    scanObject = {}
    for object in range(objects):
        scanObject[object] = db.child('Contracts').child(contractAddress).child(object).get().val()

    return scanObject

# called to transfer ownership of a contract from one UID to another
# takes the contract, the current UID, and the next UID
def transferOwner(contractAddress, uid, nextUid):
    # get required data for logic
    objects = db.child('Contracts').child(contractAddress).child('objects').get().val()
    owner = db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('owner').get().val()

    if owner == uid:
        # construct data object for new contract event
        data = {
            "time": str(datetime.datetime.now()),
            "grower": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('grower').get().val()),
            "owner": str(nextUid),
            "cropSize": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('cropSize').get().val()),
            "hempState": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('hempState').get().val()),
            "coa": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('coa').get().val(),
            "state": {
                "planted": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('planted').get().val(),
                "harvested": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('harvested').get().val(),
                "inTransit": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('inTransit').get().val(),
                "delivered": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('delivered').get().val(),
                "tested": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('tested').get().val(),
                "validated": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('validated').get().val()
            }
        }

        ### TODO: change the inTransit and delivered states based on the roles of the new owner. if they're a trucker make it intransit, if theyre a processor/manufacturer/enduser make it delivered

        # push new contract state
        db.child('Contracts').child(contractAddress).child(str(objects)).set(data)
        # update object count
        db.child('Contracts').child(contractAddress).update({"objects": objects + 1})

    print(str(objects))
    generateObjectHash(contractAddress, str(objects))
    return

# called to attach a CoA to the contract
# takes the contract, a UID, and a CoA
def addCoa(contractAddress, uid, coa):
    # get required data for logic
    objects = db.child('Contracts').child(contractAddress).child('objects').get().val()
    owner = db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('owner').get().val()

    if (owner == uid) or (uid == 'TechnicianUID'):
        # construct data object for new contract event
        data = {
            "time": str(datetime.datetime.now()),
            "grower": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('grower').get().val()),
            "owner": str(uid),
            "cropSize": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('cropSize').get().val()),
            "hempState": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('hempState').get().val()),
            "coa": coa,
            "state": {
                "planted": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('planted').get().val(),
                "harvested": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('harvested').get().val(),
                "inTransit": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('inTransit').get().val(),
                "delivered": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('delivered').get().val(),
                "tested": True,
                "validated": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('validated').get().val()
            }
        }

        # push new contract state
        db.child('Contracts').child(contractAddress).child(str(objects)).set(data)
        # update the number of objects
        db.child('Contracts').child(contractAddress).update({"objects": objects + 1})

    generateObjectHash(contractAddress, str(objects))
    return

# called to validate the CoA on a contract
# takes the contract, and the UID of the validating user
def validateCoa(contractAddress, uid):
    # get required data for logic
    objects = db.child('Contracts').child(contractAddress).child('objects').get().val()
    tested = db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('tested').get().val()

    if tested:
        # construct data object for new contract event
        data = {
            "time": str(datetime.datetime.now()),
            "grower": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('grower').get().val()),
            "owner": str(uid),
            "cropSize": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('cropSize').get().val()),
            "hempState": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('hempState').get().val()),
            "coa": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('coa').get().val(),
            "state": {
                "planted": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('planted').get().val(),
                "harvested": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('harvested').get().val(),
                "inTransit": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('inTransit').get().val(),
                "delivered": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('delivered').get().val(),
                "tested": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('tested').get().val(),
                "validated": True
            }
        }

        # push new contract state
        db.child('Contracts').child(contractAddress).child(str(objects)).set(data)
        # update the number of objects
        db.child('Contracts').child(contractAddress).update({"objects": objects + 1})

    generateObjectHash(contractAddress, str(objects))
    return

# called to update the state of the hemp
# takes the contract, UID, and a string describing the new state
def manufacture(contractAddress, uid, newHempState):
    # get required data for logic
    objects = db.child('Contracts').child(contractAddress).child('objects').get().val()
    owner = db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('owner').get().val()

    if (owner == uid) or (uid == 'ManufacturerUID'):
        # construct data object for new contract event
        data = {
            "time": str(datetime.datetime.now()),
            "grower": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('grower').get().val()),
            "owner": str(uid),
            "cropSize": str(db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('cropSize').get().val()),
            "hempState": str(newHempState),
            "coa": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('coa').get().val(),
            "state": {
                "planted": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('planted').get().val(),
                "harvested": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('harvested').get().val(),
                "inTransit": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('inTransit').get().val(),
                "delivered": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('delivered').get().val(),
                "tested": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('tested').get().val(),
                "validated": db.child('Contracts').child(contractAddress).child(str(objects - 1)).child('state').child('validated').get().val()
            }
        }

        # push new contract state
        db.child('Contracts').child(contractAddress).child(str(objects)).set(data)
        # update the number of objects
        db.child('Contracts').child(contractAddress).update({"objects": objects + 1})

    generateObjectHash(contractAddress, str(objects))
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
