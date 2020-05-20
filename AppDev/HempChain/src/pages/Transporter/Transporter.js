//This will be the display page for a user whos' agencey type is Cultivator
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import Prompt from 'react-native-input-prompt';
import Logo from '../Authentication/components/Logo';
import LoginForm from '../Authentication/components/LoginForm';

// sub pages for Cultivator
import HarvestInformation from '../Cultivator/HarvestInformation'
import Buying from '../Cultivator/Buying'
import Selling from '../Cultivator/Selling'

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

import * as webHelp from '../../utility/webHelper';

export default class Transporter extends Component{
    constructor(props) {
        super(props)
        this.state= ({
            location: 'Scan or Enter a QR code to display the destination address for a shipment.',
        })
        this.checkDestination = this.checkDestination.bind(this);
    ;}

    //Firebase signout function
    onSignoutPress = () => {
        firebase.auth().signOut().then(() => {
            Alert.alert("Successfully signed out")
        }, (error) => {
            Alert.alert(error.message);
        });
        this.props.navigation.navigate('Login');
    }

    async checkDestination(serial) {
        let scanData = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/scan', {
            address: serial,
            uid: firebase.auth().currentUser.uid
        });
        let eventCount = Object.keys(scanData).length;
        this.setState({'location': scanData[(eventCount - 1).toString()]['location']});
    }

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    Transporter Page
                </Text>
                <Text style={Typography.buttonText}>
                    {"\n"} {this.state.location} {"\n"}
                </Text>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('CheckDestination', {checkDestination: this.checkDestination})}>
                    <Text style={Typography.buttonText}>
                        Check Destination
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('QRGenerator')}>
                    <Text style={Typography.buttonText}>
                        Generate QR code
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.onSignoutPress(this.state.email)}>
                    <Text style={Typography.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
