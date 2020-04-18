import json
import pyrebase
import smtplib
import ssl

config = {
    "apiKey": "AIzaSyCW8jXAWYtTZetKkMo8w7XEZGMlXyQkh-g",
    "authDomain": "jarrowchain.firebaseapp.com",
    "databaseURL": "https://jarrowchain.firebaseio.com",
    "projectId": "jarrowchain",
    "storageBucket": "jarrowchain.appspot.com",
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

emailPassword = ''

# the entry point of this thread
# starts up all authentication runners
def start(emailPass):
    print('Starting Authentication Runners.')
    emailPassword = emailPass
    runnerManager()
    return

# the function that manages the runner stream
def runnerManager():
    my_stream = db.child("Users").stream(stream_handler)

# called whenever there is a change in the database
def stream_handler(message):
    # filter out events that aren't additions (single changes, deletions, etc.)
    # should only fire when a new user is added
    if len(message['path']) >= 2 and (not message['data'] == None) and (not message['data']['validated']):

        # read in the JSON data for expected users
        expectedUserData = json.loads(open("runners/expectedUsers.json").read())

        # all user validation and feedback for regulator registration
        if message['data']['agency'] == 'Regulator':
            expectedRegulators = expectedUserData['regulators']
            if checkRegulator(expectedRegulators, message['path'][1:]):
                # successfull registration
                db.child("Users").child(message['path'][1:]).update({"validated": True})
                dispatchEmail(generateGoodMessage(message['path'], message['data']))
            else:
                # failed registration
                dispatchEmail(generateBadMessage(message['path'], message['data']))

        # all user validation and feedback for technician registration
        elif message['data']['agency'] == 'Technician':
            expectedTechnicians = expectedUserData['technicians']
            if checkTechnician(expectedTechnicians, message['path'][1:]):
                # successfull registration
                db.child("Users").child(message['path'][1:]).update({"validated": True})
                dispatchEmail(generateGoodMessage(message['path'], message['data']))
            else:
                # failed registration
                dispatchEmail(generateBadMessage(message['path'], message['data']))

        # all user validation and feedback for police registration
        elif message['data']['agency'] == 'Police/Highway':
            expectedEnforcement = expectedUserData['enforcement']
            if checkPolice(expectedEnforcement, message['path'][1:]):
                # successfull registration
                db.child("Users").child(message['path'][1:]).update({"validated": True})
                dispatchEmail(generateGoodMessage(message['path'], message['data']))
            else:
                # failed registration
                dispatchEmail(generateBadMessage(message['path'], message['data']))

# check the validity of a regulator registration
# takes a JSON object containing all expected users and the newly registered uid
# checks the firebase database of the uid and compares it to each expected user
# returns true if the user is expected and false otherwise
def checkRegulator(expectedUsers, newUid):
    user = db.child("Users").child(newUid).get().val()
    for expectedUser in expectedUsers:
        if user['email'] == expectedUser['email'] and user['firstName'] == expectedUser['first'] and user['lastName'] == expectedUser['last']:
            return True
    return False

# check the validity of a technician registration
# takes a JSON object containing all expected users and the newly registered uid
# checks the firebase database of the uid and compares it to each expected user
# returns true if the user is expected and false otherwise
def checkTechnician(expectedUsers, newUid):
    user = db.child("Users").child(newUid).get().val()
    for expectedUser in expectedUsers:
        if user['email'] == expectedUser['email'] and user['firstName'] == expectedUser['first'] and user['lastName'] == expectedUser['last'] and user['manager'] == expectedUser['manager']:
            return True
    return False

# check the validity of a police registration
# takes a JSON object containing all expected users and the newly registered uid
# checks the firebase database of the uid and compares it to each expected user
# returns true if the user is expected and false otherwise
def checkPolice(expectedUsers, newUid):
    user = db.child("Users").child(newUid).get().val()
    for expectedUser in expectedUsers:
        if user['email'] == expectedUser['email'] and user['firstName'] == expectedUser['first'] and user['lastName'] == expectedUser['last'] and user['badgeID'] == expectedUser['badge']:
            return True
    return False

# sends an email to the contact center to alert about actions the server takes
# takes the message that will be sent as the body of the email
# returns nothing
def dispatchEmail(message):
    # connection settings
    smtpServer = 'smtp.office365.com'
    port = 587
    senderEmail = 'contactcenter@jarrowtech.com'
    context = ssl.create_default_context()

    try:
        # open a connection to the server
        server = smtplib.SMTP(smtpServer, port)
        # server.ehlo()
        server.starttls(context=context)
        # server.ehlo()
        server.login(senderEmail, emailPassword)

        # send the email
        server.sendmail(senderEmail, senderEmail, message)
    except Exception as e:
        print(e)
    finally:
        server.quit()
    return

# generate the good message with the uid and data used to register
def generateGoodMessage(uid, data):
    m = """\
    Subject: Expected User Registered

    This is an automated message.
    A user with uid: """
    m += uid
    m += ' has successfuly registered. No further action is required.\n\n'
    m += data
    return m

# generate the bad message with the uid and data used to register
def generateBadMessage(uid, data):
    m = """\
    Subject: [Action Required] Unexpected Elevated User Registration

    This is an automated message.
    A user with uid: """
    m += uid
    m += ' has tried to register with the data '
    m += data
    m += '\n\nVisit the firebase database and change the `validated` property to `true` if this is an expected login.'
    return m
