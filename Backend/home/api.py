from flask import jsonify, Blueprint, request
from flask_cors import cross_origin

import blockchain.blockInterface as block

home_api = Blueprint('home_api', __name__)

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

@home_api.route('/api/books')
@cross_origin()
def api_all():
    return jsonify(books)

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
# returns the address to the created contract
@home_api.route('/api/web/makeContract', methods=['GET', 'POST'])
@cross_origin()
def api_makeContract():
    HempContract = block.makeContract()
    return jsonify(HempContract.address)

@home_api.route('/api/web/harvest', methods=['GET', 'POST'])
@cross_origin()
def api_harvest():
    try:
        HempContract = block.makeContractFromAddress(request.json.address)
        block.plant(HempContract)
        block.harvest(HempContract, request.json.cropSize)
        return jsonify(True)
    except Exception as e:
        return jsonify(False)


@home_api.route('/api/web/scan', methods=['GET', 'POST'])
@cross_origin()
def api_scan():
    HempContract = block.makeContractFromAddress('0xd3eCcC0981C6cfebF14FFCdFd41267e28a2CB364')
    # this is currently failing because an assert in scan says it must be harvested first
    scanResults = block.scan(HempContract, 'EndUser')
    print(scanResults)
    return 'Did it.'
