from flask import jsonify, Blueprint, request
from flask_cors import cross_origin

import contracts.contractHandler as backend
import runners.validator as validator

import time

home_api = Blueprint('home_api', __name__)

@home_api.route('/api/time', methods=['GET'])
@cross_origin()
def api_time():
    return {'time': time.time()}

###############################################
###############################################
#
#  WEB CONTRACT
#
###############################################
###############################################
# REMOVE FOR PROD
# a simple test route to demonstrate all of the required methods for the API
@home_api.route('/api/web/test', methods=['GET', 'POST'])
@cross_origin()
def api_test():
    contract = backend.createNewContract()
    backend.plant(contract, 'TestUID', '456 Field House Rd')
    backend.harvest(contract, 'TestUID', 5)
    backend.transferOwner(contract, 'TestUID', 'NewOwnerUid', '123 Final Destination St')
    coa = [[0, 0, 0], [1, 1, 1], [0, 0, 0], [0, 0, 0]]
    backend.addCoa(contract, 'TechnicianUID', coa)
    backend.validateCoa(contract, 'TechManagerUID')
    backend.manufacture(contract, 'ManufacturerUID', "Processed into CBD Oil")
    scanObject = backend.scan(contract, 'TestUID')
    return jsonify(scanObject)

# call to create a new Hemp contract.
# requires nothing
# returns the address to the created contract
@home_api.route('/api/web/makeContract', methods=['GET', 'POST'])
@cross_origin()
def api_makeContract():
    try:
        contract = backend.createNewContract()
        return jsonify(contract)
    except Exception as e:
        print(e)
        return jsonify(False)

# call to plant a contract
# requires a contract address and a UID
# returns True if it successfully planted and False otherwise
@home_api.route('/api/web/plant', methods=['GET', 'POST'])
@cross_origin()
def api_plant():
    try:
        if validator.contractExists(request.json['address']) and validator.farmer(request.json['uid']):
            backend.plant(request.json['address'], request.json['uid'], request.json['location'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        print(e)
        return jsonify(False)

# call to harvest a contract
# requires a contract address, a UID, and a crop size sent in a post request
# returns True if it successfully harvests and False otherwise
@home_api.route('/api/web/harvest', methods=['GET', 'POST'])
@cross_origin()
def api_harvest():
    try:
        if validator.contractExists(request.json['address']) and validator.farmer(request.json['uid']):
            backend.plant(request.json['address'], request.json['uid'], request.json['location'])
            backend.harvest(request.json['address'], request.json['uid'], request.json['cropSize'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        print(e)
        return jsonify(False)

# call to scan a contract
# requires an address to a contract, a UID and a userTag
# return a ScanObject if successful and False otherwise
@home_api.route('/api/web/scan', methods=['GET', 'POST'])
@cross_origin()
def api_scan():
    try:
        if validator.contractExists(request.json['address']) and validator.exists(request.json['uid']):
            scanResults = backend.scan(request.json['address'], request.json['uid'])
            return scanResults
        return jsonify(False)
    except Exception as e:
        print(e)
        return jsonify(False)

# call to transfer ownership from one UID to another
# requires an address to a contract, the current userID, the next userID, and the role of the next user
# returns a True if successful and False otherwise
@home_api.route('/api/web/transferOwner', methods=['GET', 'POST'])
@cross_origin()
def api_transferOwner():
    try:
        if validator.contractExists(request.json['address']) and validator.exists(request.json['ownerUid']) and validator.exists(request.json['newOwnerUid']):
            backend.transferOwner(request.json['address'], request.json['ownerUid'], request.json['newOwnerUid'], request.json['location'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        print(e)
        return jsonify(False)

# call to add a CoA to the contract
# requires an address to a contract, a UID, and a certificate of analysis
# returns a True if successful and False otherwise
@home_api.route('/api/web/addCoa', methods=['GET', 'POST'])
@cross_origin()
def api_addCoa():
    try:
        if validator.contractExists(request.json['address']) and validator.technician(request.json['uid']):
            backend.addCoa(request.json['address'], request.json['uid'], request.json['coa'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        print(e)
        return jsonify(False)

# call to validate the CoA of the contract
# requires an address to a contract and a UID
# returns True if successful and False otherwise
@home_api.route('/api/web/validateCoa', methods=['GET', 'POST'])
@cross_origin()
def api_validateCoa():
    try:
        if validator.contractExists(request.json['address']) and validator.technician(request.json['uid']):
            backend.validateCoa(request.json['address'], request.json['uid'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        print(e)
        return jsonify(False)

# call to update what state the hemp is in
# requires an address to a contract, a UID, and a string with the new state
# returns True if successful and False otherwise
@home_api.route('/api/web/manufacture', methods=['GET', 'POST'])
@cross_origin()
def api_manufacture():
    try:
        if validator.contractExists(request.json['address']) and validator.manufacturer(request.json['uid']):
            backend.manufacture(request.json['address'], request.json['uid'], request.json['hempState'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        print(e)
        return jsonify(False)

###############################################
###############################################
#
#  QR SCANNING
#
###############################################
###############################################
# call to validate the value in a qr code
# requires a contract ID (from a qr code) and the uid of the scanning user
# returns True if successful and False otherwise
@home_api.route('/api/qr/scanned', methods=['GET', 'POST'])
@cross_origin()
def api_scanned():
    try:
        if validator.contractExists(request.json['address']) and validator.exists(request.json['uid']):
            return jsonify(True)
    except Exception as e:
        print(e)
        return jsonify(False)
