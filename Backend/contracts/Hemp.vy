# Hempchain Smart Contract
# @version 0.1.0b15

# state of contract structs
struct StateStruct:
    planted:   bool
    harvested: bool
    inTransit: bool
    inTesting: bool
    delivered: bool

# scan object struct
struct ScanObject:
    size: uint256
    state: StateStruct
    grower: string[128]
    owner: string[128]
    cocr: uint256
    coa: uint256[3][4]

# best practice appears to be using an event to return information to the client instead of trying
# to check the state of the contract with a return on a transact (something that is impossible)
# scan event
ScanInt: event({_size: uint256})
ScanString: event({_grower: string[128]})

# properties of the contract
contractVersion: public(uint256)
cropSize: public(uint256)
growerAddress: public(string[128])
ownerAddress: public(string[128])
state: public(StateStruct)
coa: public(uint256[3][4])
hempState: public(string[256])

chainOfCustodyAddress: map(uint256, string[128])
chainOfCustodyRole: map(uint256, uint256)
cocItems: public(uint256)

@public
def __init__():
    self.contractVersion = 2
    self.hempState = "Hemp"
    self.coa = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
    self.cocItems = 1

@private
@constant
def getRoleCode(mRole: string[12]) -> uint256:
    if mRole == "Farmer":
        return 10
    if mRole == "Planted":
        return 11
    if mRole == "Enforcement":
        return 20
    if mRole == "Technician":
        return 30
    if mRole == "TestingLog":
        return 31
    if mRole == "Transporter":
        return 40
    if mRole == "Regulator":
        return 50
    if mRole == "EndUser":
        return 60
    if mRole == "Initialize":
        return 61
    if mRole == "Manufacturer":
        return 70
    if mRole == "Manufacturin":
        return 71
    # scan
    return 0

@public
@nonreentrant("createContract")
def createContract(owner: string[128]):
    assert self.contractVersion == 2
    self.cropSize = 0
    self.growerAddress = owner
    self.ownerAddress = owner
    self.chainOfCustodyAddress[self.cocItems - 1] = owner
    self.chainOfCustodyRole[self.cocItems - 1] = 61

@public
@nonreentrant("plant")
def plant(uid: string[128]):
    assert self.contractVersion == 2
    assert (not self.state.planted)
    assert uid == self.ownerAddress
    assert uid == self.growerAddress
    self.state.planted = True

    # update chain of custody
    self.chainOfCustodyAddress[self.cocItems] = uid
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("Farmer")
    self.cocItems = self.cocItems + 1

@public
@nonreentrant("harvest")
def harvest(uid: string[128], size: uint256):
    # assert msg.sender == $HEMPCHAIN_ADDRESS
    assert self.contractVersion == 2
    assert (self.state.planted and (not self.state.harvested))
    assert uid == self.growerAddress
    assert uid == self.ownerAddress

    # update chain of custody
    self.chainOfCustodyAddress[self.cocItems] = uid
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("Farmer")
    self.cocItems = self.cocItems + 1

    # update crop size with harvest info
    self.cropSize = size
    self.state.harvested = True

# an event that fires and logs every scan action of the product
@public
def scan(uid: string[128], mRole: string[12]):
    # assert msg.sender == $HEMPCHAIN_ADDRESS
    assert self.contractVersion == 2

    # update chain of custody
    self.chainOfCustodyAddress[self.cocItems] = uid
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("Scan")
    self.cocItems = self.cocItems + 1

    # this should be refactored once Events can emit Structs
    log.ScanInt(self.cropSize)
    log.ScanString(self.growerAddress)
    log.ScanString(self.ownerAddress)
    log.ScanInt(self.chainOfCustodyRole[self.cocItems - 1])

@public
def transferOwner(uid: string[128], nextOwner: string[128], mRole: string[12]):
    # assert msg.sender == $HEMPCHAIN_ADDRESS
    assert self.contractVersion == 2
    assert self.ownerAddress == uid

    # update chain of custody
    self.ownerAddress = nextOwner
    self.chainOfCustodyAddress[self.cocItems] = nextOwner
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode(mRole)
    self.cocItems = self.cocItems + 1

    # update state information
    if mRole == "Transporter":
        self.state.inTransit = True
        self.state.inTesting = False
        self.state.delivered = False
    elif mRole == "Technician":
        self.state.inTransit = False
        self.state.inTesting = True
        self.state.delivered = False
    elif mRole == "EndUser":
        self.state.inTransit = False
        self.state.inTesting = False
        self.state.delivered = True

# add testing data to the contract
@public
def testCrop(uid: string[128], mCoA: uint256[3][4]):
    # assert msg.sender == $HEMPCHAIN_ADDRESS
    # assert self.state.inTesting
    assert self.contractVersion == 2

    # update chain of custody to include testing and technician again
    self.chainOfCustodyAddress[self.cocItems] = uid
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("Technician")
    self.cocItems = self.cocItems + 1

    # update coa information
    self.coa = mCoA

# update what the hemp is currently processed as
@public
def manufacture(uid: string[128], mHempState: string[256]):
    assert self.contractVersion == 2

    # update the chain of custody to include the manufacturing
    self.chainOfCustodyAddress[self.cocItems] = uid
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("Manufacturin")
    self.cocItems = self.cocItems + 1

    # update what state the hemp is in
    self.hempState = mHempState
