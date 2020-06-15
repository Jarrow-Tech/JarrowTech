//Lab users will select to log a report
// for now this is just the preliminary page
import * as firebase from 'firebase';

import React, { Component } from 'react';
// I'm leaving Alert in here for easier debuggin in the future --Andey
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Typography, Spacing, Buttons } from '../styles/index';

import * as webHelp from '../utility/webHelper';

async function serve() {
    console.log("Begininning Test 1");

    let farmerUID = '7W5uarYrR6g669HVbssLBom0ZHH3';
    let driverUID = 'nBK2c72v0iVsTCup2bCgHdrSN5g1';
    let enduserUID = '7W5uarYrR6g669HVbssLBom0ZHH3'

    let addy = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/makeContract', {});
    console.log(addy);

    let tryHarvest = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/harvest', {
        address: addy,
        cropSize: 100,
        uid: farmerUID,
    });
    console.log(tryHarvest);

    if (tryHarvest) {
        let scanObject = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/scan', {
            address: addy,
            userTag: 'EndUser',
            uid: enduserUID,
        });
        console.log(scanObject);
    }

    let transferOwner = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/transferOwner', {
        address: addy,
        ownerUid: farmerUID,
        newOwnerUid: driverUID,
        userTag: 'Transporter',
    });

    if (transferOwner) {
        console.log("Transfered ownership.");
    }
    console.log("Done w/ Test 1");
}

async function serve2() {
    console.log("Beginning Test 2");

    let farmerUID = '7W5uarYrR6g669HVbssLBom0ZHH3';
    let technicianUID = 'technicianUID';
    let manufacturingUID = 'zsSobaRfB6MQVLlj3l79lZGh1703';

    let addy = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/makeContract', {});
    console.log(addy);

    let tryPlant = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/plant', {
        address: addy,
        uid: farmerUID,
    });
    console.log(tryPlant);

    let tryAddCoa = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/addCoa', {
        address: addy,
        uid: technicianUID,
        coa: [[0, 0, 0], [1, 1, 1], [0, 0, 0], [0, 0, 0]],
    });
    console.log(tryAddCoa);

    let tryValidate = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/validateCoa', {
        address: addy,
        uid: technicianUID,
    });
    console.log(tryValidate);

    let tryManufacture = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/manufacture', {
        address: addy,
        uid: manufacturingUID,
        hempState: 'CBD',
    })
    console.log(tryManufacture);
    console.log("Done w/ Test 2");
}

export default class TestPage extends Component {
    constructor(props) {
        super(props)
        this.state= ({
    });}

    render(){
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    Web3 Testing Page
                </Text>
                <TouchableOpacity style={Buttons.button} onPress={() => serve()}>
                    <Text style={Typography.buttonText}>
                        Test 1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => serve2()}>
                    <Text style={Typography.buttonText}>
                        Test 2
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
