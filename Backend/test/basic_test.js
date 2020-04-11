const Hemp = artifacts.require("Hemp");

let coa = [[0, 0, 0], [1, 1, 1], [0, 0, 0], [0, 0, 0]];

contract("Hemp", accounts => {

    let HempInst = Hemp.deployed().then(inst => {HempInst = inst});

    it("Plant, Harvest, Scan, Transfer to Technician, Add COA", () => {
        HempInst.plant.call();
        HempInst.harvest.call(10);
        HempInst.scan.call("Farmer");
        HempInst.transferOwner.call("Technician");
        HempInst.testCrop.call(coa);
    });

})
