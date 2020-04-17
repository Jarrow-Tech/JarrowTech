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
    my_stream = db.child("Users").stream(stream_handler)

def stream_handler(message):
    # filter out events that aren't additions (single changes, deletions, etc.)
    # should only fire when a new user is added
    if len(message['path']) >= 2 and (not message['data'] == None) and (not message['data']['validated']):

        # read and prep JSON data for expected users
        expectedUserData = json.loads(open("runners/expectedUsers.json").read())
        expectedRegulators = expectedUserData['regulators']
        expectedEnforcement = expectedUserData['enforcement']
        expectedTechnicians = expectedUserData['technicians']

        if message['data']['agency'] == "Regulator":
            if checkRegulator(expectedRegulators, message['path'][1:]):
                db.child("Users").child(message['path'][1:]).update({"validated": True})

        elif message['data']['agency'] == "Technician":
            if checkTechnician(expectedTechnicians, message['path'][1:]):
                db.child("Users").child(message['path'][1:]).update({"validated": True})

        elif message['data']['agency'] == "Police/Highway":
            if checkPolice(expectedEnforcement, message['path'][1:]):
                db.child("Users").child(message['path'][1:]).update({"validated": True})

def checkRegulator(expectedUsers, newUid):
    user = db.child("Users").child(newUid).get().val()
    for expectedUser in expectedUsers:
        if user['email'] == expectedUser['email'] and user['firstName'] == expectedUser['first'] and user['lastName'] == expectedUser['last']:
            return True
    return False

def checkTechnician(expectedUsers, newUid):
    user = db.child("Users").child(newUid).get().val()
    for expectedUser in expectedUsers:
        if user['email'] == expectedUser['email'] and user['firstName'] == expectedUser['first'] and user['lastName'] == expectedUser['last'] and user['manager'] == expectedUser['manager']:
            return True
    return False

def checkPolice(expectedUsers, newUid):
    user = db.child("Users").child(newUid).get().val()
    for expectedUser in expectedUsers:
        if user['email'] == expectedUser['email'] and user['firstName'] == expectedUser['first'] and user['lastName'] == expectedUser['last'] and user['badgeID'] == expectedUser['badge']:
            return True
    return False

def dispatch(unexpectedUsers):
    return
