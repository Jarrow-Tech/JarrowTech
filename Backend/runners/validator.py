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
users = db.child("Users").get()

def farmer(uid):
    return (users.val()[uid]['agency'] == 'Farmer')

def enforcement(uid):
    return (users.val()[uid]['agency'] == 'Police/Highway')

# currently the database doesn't have a specified ID name for techs
# after that is added, we can update this method to pass in the right case
def technician(uid):
    return True

def transporter(uid):
    return (users.val()[uid]['agency'] == 'Trucker')

def government(uid):
    return (users.val()[uid]['agency'] == 'Regulator')

# currently the database doesn't have a specified ID name for techs
# after that is added, we can update this method to pass in the right case
# currently end users have so little power, it would be inconsequential to simply
# validate a UID for them
def endUser(uid):
    return True

def manufacturer(uid):
    return (users.val()[uid]['agency'] == 'Factory')

# there may be a more efficient way to do this once we have a larger number
# of users, but for now, i didn't see a native call to check if a key exists
# and this works, so it'll stay for our MVP
def exists(uid):
    for each in users.each():
        if each.key() == uid:
            return True
    return False

def contractExists(contract):
    contracts = db.child('Contracts').get()
    for each in contracts.each():
        if each.key() == contract:
            return True
    return False
