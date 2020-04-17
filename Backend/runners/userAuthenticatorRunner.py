import json
import pyrebase

config = {
    "apiKey": "AIzaSyCW8jXAWYtTZetKkMo8w7XEZGMlXyQkh-g",
    "authDomain": "jarrowchain.firebaseapp.com",
    "databaseURL": "https://jarrowchain.firebaseio.com",
    "projectId": "jarrowchain",
    "storageBucket": "jarrowchain.appspot.com",
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

def start():
    print("Starting Authentication Runners.")
    runnerManager()
    return

def runnerManager():
    # quit = False
    # while not quit:
    #     # read and prep JSON data for expected users
    #     expectedUserData = json.loads(open("runners/expectedUsers.json").read())
    #     expectedRegulators = expectedUserData['regulators']
    #     expectedEnforcement = expectedUserData['enforcement']
    #     expectedTechnicians = expectedUserData['technicians']
    #
    #     # prep current database
    #     users = db.child("Users").get()
    #     dbRegulators = []
    #     dbEnforcement = []
    #     dbTechnicians = []
    #
    #     for user in users.val():
    #         print(db.child("Users").child(user).get().val())
    #         if users[user]['agency'] == 'Regulator' and (not users[user]['validated']):
    #             dbRegulators.append(user)
    #         elif users[user]['agency'] == 'Police/Highway' and (not users[user]['validated']):
    #             dbEnforcement.append(user)
    #         elif users[user]['agency'] == 'Technician' and (not users[user]['validated']):
    #             dbTechnicians.append(user)
    #
    #     validatedUids = []
    #     validatedUids.append(checkRegulator(expectedRegulators, dbRegulators))
    #     validatedUids.append(checkTechnician(expectedEnforcement, dbEnforcement))
    #     validatedUids.append(checkPolice(expectedTechnicians, dbTechnicians))
    #
    #     print(validatedUids)
    #
    #     for uid in validatedUids:
    #         db.child("Users").child(uid).update({"validated": True})

    my_stream = db.child("Users").stream(stream_handler)

def stream_handler(message):
    print(message["event"]) # put
    print(message["path"]) # /-K7yGTTEp7O549EzTYtI
    print(message["data"]) # {'title': 'Pyrebase', "body": "etc..."}

def checkRegulator(expected, db):
    validatedUids = []
    for user in db:
        for expectedUser in expected:
            if user['email'] == expectedUser['email'] and user['firstName'] == expectedUser['first'] and user['lastName'] == expected['last']:
                validatedUids.append(user)
        if user in validatedUids:
            db.pop(db.index(user))
    dispatch(db)
    return validatedUids

def checkTechnician(expected, db):
    validatedUids = []
    for user in db:
        for expectedUser in expected:
            if user['email'] == expectedUser['email'] and user['firstName'] == expectedUser['first'] and user['lastName'] == expected['last'] and user['manager'] == expected['manager']:
                validatedUids.append(user)
        if user in validatedUids:
            db.pop(db.index(user))
    dispatch(db)
    return validatedUids

def checkPolice(expected, db):
    validatedUids = []
    for user in db:
        for expectedUser in expected:
            if user['email'] == expectedUser['email'] and user['firstName'] == expectedUser['first'] and user['lastName'] == expected['last'] and user['badgeID'] == expected['badge']:
                validatedUids.append(user)
        if user in validatedUids:
            db.pop(db.index(user))
    dispatch(db)
    return validatedUids

def dispatch(unexpectedUsers):
    return
