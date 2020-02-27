//This will be the display page for when a regulator wants to search up a transaction
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import Prompt from 'react-native-input-prompt';

//See sign-up pg for notes
import { user } from '../../../../App';

import { Typography, Spacing, UserInterface, Buttons } from '../../../styles/index';

export default class QRGenerator extends Component{
    constructor(props) {
        super(props)
        this.state= ({
            email: '',
            isOpen: false,
            serial: '',
    });}

    onSignoutPress = () => {
        firebase.auth().signOut().then(() => {
            Alert.alert("Successfully signed out")
        }, (error) => {
            Alert.alert(error.message);
        });
        this.props.navigation.navigate('Login');
    }

    submitSerial = () => {
        console.log("Searching for serial: " + this.state.serial);
        console.log("Creating QR Code for serial #: "+this.state.serial)
    }

    barcodeRecognized = e => {
        this.setState({serial: e.data})
    }

    render(){
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                   This page will generate a QR code based off of the entered serial ID
                </Text>
                <TextInput style={UserInterface.inputBox}
                 placeholder="Serial Number"
                 placeholderTextColor='#ffffff'
                 ref={(input) => this.serial = input}
                 onChangeText={(serial) => this.setState({serial})}
                 value={this.state.serial} />
                <TouchableOpacity style={Buttons.button} onPress={() => this.submitSerial()}>
                    <Text style={Typography.buttonText}>
                        Search Serial
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.goBack()}>
                    <Text style={Typography.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={()=>this.onSignoutPress(this.state.email)}>
                    <Text style={Typography.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}