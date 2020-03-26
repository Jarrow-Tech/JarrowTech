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
    tx_hash = Hemp.constructor().transact()
    tx_receipt = w3.eth.waitForTransactionReceipt(tx_hash)

    HempContract = w3.eth.contract(
        address=tx_receipt.contractAddress,
        abi=abi
    )

    return HempContract

def plant(contract):
    print("Starting Contract Plant Function")
    contract.functions.plant.call()
    return '2'
