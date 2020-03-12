# Hempchain Smart Contract
# @version 0.1.0b15

# state of contract structs
struct StateStruct:
    planted:   bool
    harvested: bool
    inTransit: bool
    inTesting: bool
    delivered: bool

# Certificate Of Analysis structs
# struct for each line in the table
struct CoALine:
    loq: uint256
    conc: uint256
    weight: uint256

# struct for the table
struct CertificateOfAnalysis:
    cbda: CoALine
    thca: CoALine
    cbga: CoALine
    dthc: CoALine

# scan object struct
struct ScanObject:
    size: uint256
    serial: uint256
    state: StateStruct
    grower: address
    owner: address
    cocr: uint256
    coa: CertificateOfAnalysis

# roles:
#   10 - farmer
#   50 - regulator (government)
#   20 - enforcement (law enforcement)
#   30 - technician (from the labs)
#   40 - transporter
#   60 - endUser
#   11 - planted
#   00 - scan
#   31 - TestingLog

# properties of the contract
contractVersion: public(uint256)
cropSize: public(uint256)
serialNumber: public(uint256)
growerAddress: public(address)
ownerAddress: public(address)
state: public(StateStruct)
coa: public(CertificateOfAnalysis)

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
    self.cropSize = 10

    # chain of custody info
    self.cocItems = 1
    self.chainOfCustodyAddress[self.cocItems - 1] = msg.sender

    if True:
        self.state.planted = True
        self.state.harvested = True
        self.chainOfCustodyRole[self.cocItems - 1] = 10
    else:
        self.state.planted = True
        self.chainOfCustodyRole[self.cocItems - 1] = 11

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
@nonreentrant("harvest")
def harvest() -> ScanObject:
    assert (self.state.planted and (not self.state.harvested))
    self.state.harvested = True

    # update chain of custody
    self.chainOfCustodyAddress[self.cocItems] = msg.sender
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("Farmer")
    self.cocItems = self.cocItems + 1

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
def testCrop(mCoA: CertificateOfAnalysis) -> ScanObject:
    assert self.chainOfCustodyRole[self.cocItems] == self.getRoleCode("Technician")
    assert self.chainOfCustodyAddress[self.cocItems] == msg.sender

    # update chain of custody to include testing and technician again
    self.chainOfCustodyAddress[self.cocItems] = msg.sender
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("TestingLog")
    self.chainOfCustodyAddress[self.cocItems + 1] = msg.sender
    self.chainOfCustodyRole[self.cocItems] = self.getRoleCode("Technician")
    self.cocItems = self.cocItems + 2

    # update coa information
    self.coa = mCoA

    return ScanObject({size: self.cropSize, serial: self.serialNumber, state: self.state, grower: self.growerAddress, owner: self.ownerAddress, cocr: self.chainOfCustodyRole[self.cocItems], coa: self.coa})
