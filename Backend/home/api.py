from flask import jsonify, Blueprint, request
from flask_cors import cross_origin

import blockchain.blockInterface as block

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
    print(request.json)
    w3 = block.getWeb3Endpoint()
    HempContract = block.makeContract()
    block.plant(HempContract)
    block.harvest(HempContract, 100)
    scanResults = block.scan(HempContract, 'EndUser')
    print(scanResults)
    scanResults = block.transferOwner(HempContract, 'Technician')
    print(scanResults)
    scanResults = block.testCrop(HempContract, [[0, 0, 0], [1, 1, 1], [0, 0, 0], [0, 0, 0]])
    print(scanResults)
    return 'Done'

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

# call to harvest a contract
# requires a contract address and a crop size sent in a post request
# returns True if it successfully harvests and False otherwise
@home_api.route('/api/web/harvest', methods=['GET', 'POST'])
@cross_origin()
def api_harvest():
    try:
        HempContract = block.makeContractFromAddress(request.json['address'])
        block.plant(HempContract)
        block.harvest(HempContract, request.json['cropSize'])
        return jsonify(True)
    except Exception as e:
        return jsonify(False)

# call to scan a contract
# requires an address to a contract and a userTag
# return a ScanObject if successful and False otherwise
@home_api.route('/api/web/scan', methods=['GET', 'POST'])
@cross_origin()
def api_scan():
    try:
        HempContract = block.makeContractFromAddress(request.json['address'])
        scanResults = block.scan(HempContract, request.json['userTag'])
        return jsonify(scanResults)
    except Exception as e:
        return jsonify(False)
