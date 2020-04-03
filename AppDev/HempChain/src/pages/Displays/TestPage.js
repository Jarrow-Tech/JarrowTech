//Lab users will select to log a report
// for now this is just the preliminary page
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Prompt from 'react-native-input-prompt';
import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';

//See sign-up pg for notes
import { user } from '../../../App';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

import * as webHelp from '../../utility/webHelper';

async function serve(){
    let addy = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/makeContract', {});
    console.log(addy);
    let tryHarvest = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/harvest', {
        address: addy,
        cropSize: 100,
    });
    console.log(tryHarvest);
    if (tryHarvest) {
        let scanObject = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/scan', {
            address: addy,
            userTag: 'EndUser',
        });
        console.log(scanObject);
    }
    console.log("Done");
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
            </View>
        );
    }
}
