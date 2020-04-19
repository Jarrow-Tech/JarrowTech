from flask import jsonify, Blueprint, request
from flask_cors import cross_origin

import blockchain.blockInterface as block
import blockchain.validator as validator

home_api = Blueprint('home_api', __name__)

# REMOVE FOR PROD
books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'first_sentence': 'The coldsleep itself was dreamless.',
     'year_published': '1992'},
    {'id': 1,
     'title': 'The Ones Who Walk Away From Omelas',
     'author': 'Ursula K. Le Guin',
     'first_sentence': 'With a clamor of bells that set the swallows soaring, the Festival of Summer came to the city Omelas, bright-towered by the sea.',
     'published': '1973'},
    {'id': 2,
     'title': 'Dhalgren',
     'author': 'Samuel R. Delany',
     'first_sentence': 'to wound the autumnal city.',
     'published': '1975'}
]

# REMOVE FOR PROD
# a bare bones api call that returns a JSON object. purely for testing
@home_api.route('/api/books')
@cross_origin()
def api_all():
    return jsonify(books)

# REMOVE FOR PROD
# a simple test route to demonstrate all of the required methods for the API
@home_api.route('/api/web/test', methods=['GET', 'POST'])
@cross_origin()
def api_test():
    # print(request.json)
    # w3 = block.getWeb3Endpoint()
    # uid1 = 'farmerUID'
    # uid2 = 'enduserUID'
    # uid3 = 'technicianUID'
    # HempContract = block.makeContract()
    # print('made contract')
    # block.initialize(HempContract, uid1)
    # print('initialized')
    # block.plant(HempContract, uid1)
    # print('planted')
    # block.harvest(HempContract, uid1, 100)
    # print('harvested')
    # scanResults = block.scan(HempContract, uid2, 'EndUser')
    # print(scanResults)
    # block.transferOwner(HempContract, uid1, uid3, 'Technician')
    # block.testCrop(HempContract, uid3, [[0, 0, 0], [1, 1, 1], [0, 0, 0], [0, 0, 0]])
    # return scanResults
    return jsonify(validator.exists('7W5uarYrR6g669HVbssLBom0ZHH3'))

# call to create a new Hemp contract.
# requires nothing
# returns the address to the created contract
@home_api.route('/api/web/makeContract', methods=['GET', 'POST'])
@cross_origin()
def api_makeContract():
    try:
        HempContract = block.makeContract()
        return jsonify(HempContract.address)
    except Exception as e:
        return jsonify(False)

# call to plant a contract
# requires a contract address and a UID
# returns True if it successfully planted and False otherwise
@home_api.route('/api/web/plant', methods=['GET', 'POST'])
@cross_origin()
def api_plant():
    try:
        HempContract = block.makeContractFromAddress(request.json['address'])
        block.initialize(HempContract, request.json['uid'])
        if (validator.farmer(request.json['uid'])):
            block.plant(HempContract, request.json['uid'], request.json['location'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        return jsonify(False)

# call to harvest a contract
# requires a contract address, a UID, and a crop size sent in a post request
# returns True if it successfully harvests and False otherwise
@home_api.route('/api/web/harvest', methods=['GET', 'POST'])
@cross_origin()
def api_harvest():
    try:
        HempContract = block.makeContractFromAddress(request.json['address'])
        block.initialize(HempContract, request.json['uid'])
        if (validator.farmer(request.json['uid'])):
            block.plant(HempContract, request.json['uid'])
            block.harvest(HempContract, request.json['uid'], request.json['cropSize'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        return jsonify(False)

# call to scan a contract
# requires an address to a contract, a UID and a userTag
# return a ScanObject if successful and False otherwise
@home_api.route('/api/web/scan', methods=['GET', 'POST'])
@cross_origin()
def api_scan():
    try:
        if (validator.exists(request.json['uid'])):
            HempContract = block.makeContractFromAddress(request.json['address'])
            scanResults = block.scan(HempContract, request.json['uid'], request.json['userTag'])
            # since we need to fetch individual scan results from emitted events in the blockInterface.py
            # it has to be jsonified to return to this function. as a result, scanResults is already JSON,
            # so we can't re-jsonify it. if we are able to return some other object in scanResults, you may need
            # to add the jsonify call back.
            return scanResults
        return jsonify(False)
    except Exception as e:
        return jsonify(False)

# call to transfer ownership from one UID to another
# requires an address to a contract, the current userID, the next userID, and the role of the next user
# returns a True if successful and False otherwise
@home_api.route('/api/web/transferOwner', methods=['GET', 'POST'])
@cross_origin()
def api_transferOwner():
    try:
        if (validator.exists(request.json['ownerUid']) and validator.exists(request.json['newOwnerUid'])):
            HempContract = block.makeContractFromAddress(request.json['address'])
            block.transferOwner(HempContract, request.json['ownerUid'], request.json['newOwnerUid'], request.json['location'] request.json['userTag'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        return jsonify(False)

# call to add a CoA to the contract
# requires an address to a contract, a UID, and a certificate of analysis
# returns a True if successful and False otherwise
@home_api.route('/api/web/addCoa', methods=['GET', 'POST'])
@cross_origin()
def api_addCoa():
    try:
        if (validator.technician(request.json['uid'])):
            HempContract = block.makeContractFromAddress(request.json['address'])
            block.testCrop(HempContract, request.json['uid'], request.json['coa'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        return jsonify(False)

# call to validate the CoA of the contract
# requires an address to a contract and a UID
# returns True if successful and False otherwise
@home_api.route('/api/web/validateCoa', methods=['GET', 'POST'])
@cross_origin()
def api_validateCoa():
    try:
        if (validator.technician(request.json['uid'])):
            HempContract = block.makeContractFromAddress(request.json['address'])
            block.validateCrop(HempContract, request.json['uid'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        return jsonify(False)

# call to update what state the hemp is in
# requires an address to a contract, a UID, and a string with the new state
# returns True if successful and False otherwise
@home_api.route('/api/web/manufacture', methods=['GET', 'POST'])
@cross_origin()
def api_manufacture():
    try:
        if (validator.manufacturer(request.json['uid'])):
            HempContract = block.makeContractFromAddress(request.json['address'])
            block.manufacture(HempContract, request.json['uid'], request.json['hempState'])
            return jsonify(True)
        return jsonify(False)
    except Exception as e:
        return jsonify(False)
