from web3 import Web3, HTTPProvider, IPCProvider, WebsocketProvider
import json

w3 = Web3(HTTPProvider('http://localhost:7545'))

def getWeb3Endpoint():
    return w3

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

def plant(contract):
    print("Starting Contract Plant Function")
    # contract.functions.plant().call()
    tx_hash = contract.functions.plant().transact(transaction={'from': w3.eth.accounts[3]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return

def harvest(contract, size):
    tx_hash = contract.functions.harvest(size).transact(transaction={'from': w3.eth.accounts[4]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    return

def scan(contract, role):
    tx_hash = contract.functions.scan(role).transact(transaction={'from': w3.eth.accounts[5]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    scan = contract.functions.scan(role).call()
    return scan

def transferOwner(contract, role):
    # NOTE: you must open the contract for transfer when a new owner wants to claim ownership of it
    tx_hash = contract.functions.transferOwner('Farmer').transact(transaction={'from': w3.eth.accounts[2]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    tx_hash = contract.functions.transferOwner(role).transact(transaction={'from': w3.eth.accounts[6]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    # scan = contract.functions.transferOwner(role).call()
    return #scan

def testCrop(contract, coa):
    tx_hash = contract.functions.testCrop(coa).transact(transaction={'from': w3.eth.accounts[7]})
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)
    scan = contract.functions.testCrop(coa).call()
    return scan
