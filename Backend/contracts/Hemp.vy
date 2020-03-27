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
    serial: uint256
    state: StateStruct
    grower: address
    owner: address
    cocr: uint256
    coa: uint256[3][4]

# properties of the contract
contractVersion: public(uint256)
cropSize: public(uint256)
serialNumber: public(uint256)
growerAddress: public(address)
ownerAddress: public(address)
state: public(StateStruct)
coa: public(uint256[3][4])

chainOfCustodyAddress: map(uint256, address)
chainOfCustodyRole: map(uint256, uint256)
cocItems: public(uint256)
cocTransferable: public(bool)

@public
def __init__():

    # harvest info
    self.growerAddress = msg.sender
    self.ownerAddress = msg.sender
    self.contractVersion = 1
    self.coa = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]

    # chain of custody info
    self.cocItems = 1
    self.chainOfCustodyAddress[self.cocItems - 1] = msg.sender
    self.chainOfCustodyRole[self.cocItems - 1] = 0

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
    # scan
    return 0

@public
@nonreentrant("plant")
def plant():
    assert (not self.state.planted)
    self.state.planted = True

    # update chain of custody
    self.chainOfCustodyAddress[self.cocItems] = msg.sender
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("Farmer")
    self.cocItems = self.cocItems + 1

@public
@nonreentrant("harvest")
def harvest(size: uint256) -> ScanObject:
    assert (self.state.planted and (not self.state.harvested))

    # update chain of custody
    self.chainOfCustodyAddress[self.cocItems] = msg.sender
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("Farmer")
    self.cocItems = self.cocItems + 1

    # update crop size with harvest info
    self.cropSize = size
    self.state.harvested = True

    return ScanObject({size: self.cropSize, serial: self.serialNumber, state: self.state, grower: self.growerAddress, owner: self.ownerAddress, cocr: self.chainOfCustodyRole[self.cocItems], coa: self.coa})

# an event that fires and logs every scan action of the product
@public
def scan(mRole: string[12]) -> ScanObject:
    assert self.state.harvested == True

    # update chain of custody
    self.chainOfCustodyAddress[self.cocItems] = msg.sender
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("Scan")
    self.cocItems = self.cocItems + 1

    return ScanObject({size: self.cropSize, serial: self.serialNumber, state: self.state, grower: self.growerAddress, owner: self.ownerAddress, cocr: self.chainOfCustodyRole[self.cocItems], coa: self.coa})

# a dual custody ownership schema
@public
def transferOwner(mRole: string[12]) -> ScanObject:
    assert (msg.sender == self.ownerAddress or self.cocTransferable)

    # the current owner consents to a change of ownership
    if msg.sender == self.ownerAddress:
        self.cocTransferable = True

    # the new owner is ready to recieve new item
    elif self.cocTransferable:
        # update chain of custody
        self.ownerAddress = msg.sender
        self.chainOfCustodyAddress[self.cocItems] = msg.sender
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

        # shut down modifiable contract
        self.cocTransferable = False

    return ScanObject({size: self.cropSize, serial: self.serialNumber, state: self.state, grower: self.growerAddress, owner: self.ownerAddress, cocr: self.chainOfCustodyRole[self.cocItems], coa: self.coa})

# add testing data to the contract
@public
def testCrop(mCoA: uint256[3][4]) -> ScanObject:
    assert self.state.inTesting

    # update chain of custody to include testing and technician again
    self.chainOfCustodyAddress[self.cocItems] = msg.sender
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("Technician")
    self.cocItems = self.cocItems + 1

    # update coa information
    self.coa = mCoA

    return ScanObject({size: self.cropSize, serial: self.serialNumber, state: self.state, grower: self.growerAddress, owner: self.ownerAddress, cocr: self.chainOfCustodyRole[self.cocItems], coa: self.coa})
