from web3 import Web3, HTTPProvider, IPCProvider, WebsocketProvider
from flask import jsonify
import json

w3 = Web3(HTTPProvider('http://localhost:7545'))

def getWeb3Endpoint():
    return w3

# create a contract with default information
def makeContract():
    contractJson = json.loads(open("build/contracts/Hemp.json").read())
    abi = contractJson['abi']
    bytecode = contractJson['bytecode']

    Hemp = w3.eth.contract(abi=abi, bytecode=bytecode)
    tx_hash = Hemp.constructor().transact(transaction={'from': w3.eth.accounts[2]})
    # tx_hash = Hemp.deploy(transaction={'from': w3.eth.accounts[2]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

    HempContract = w3.eth.contract(
        address=tx_receipt.contractAddress,
        abi=abi
    )

    return HempContract

# create a contract object from a specific address. (i.e. a contract has been deployed and you want to reference it again)
def makeContractFromAddress(address):
    contractJson = json.loads(open("build/contracts/Hemp.json").read())
    abi = contractJson['abi']
    bytecode = contractJson['bytecode']

    Hemp = w3.eth.contract(abi=abi, bytecode=bytecode)
    HempContract = w3.eth.contract(
        address=address,
        abi=abi
    )

    return HempContract

def initialize(contract, uid):
    tx_hash = contract.functions.createContract(uid).transact(transaction={'from': w3.eth.accounts[2]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return

def plant(contract, uid):
    tx_hash = contract.functions.plant(uid).transact(transaction={'from': w3.eth.accounts[2]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return

def harvest(contract, uid, size):
    tx_hash = contract.functions.harvest(uid, size).transact(transaction={'from': w3.eth.accounts[2]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return

# NOTE: This system of individual event listeners for different actions will be refactored once the
# events system has be extended by Vyper to include returning structs
def scan(contract, uid, role):
    tx_hash = contract.functions.scan(uid, role).transact(transaction={'from': w3.eth.accounts[2]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    events = tx_receipt['logs']
    size = int(events[0]['data'], 16)
    grower = clean(w3.toText(events[1]['data']))
    owner = clean(w3.toText(events[2]['data']))
    role = int(events[3]['data'], 16)
    return jsonify(size, grower, owner, role)

def transferOwner(contract, uidCurrent, uidNext, role):
    tx_hash = contract.functions.transferOwner(uidCurrent, uidNext, role).transact(transaction={'from': w3.eth.accounts[2]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return

def testCrop(contract, uid, coa):
    tx_hash = contract.functions.testCrop(uid, coa).transact(transaction={'from': w3.eth.accounts[2]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return

def clean(ss):
    nots = [' ', '\t', '\x00']
    o = ''
    for s in ss:
        if not s in nots:
            o += s
    return o
