// This page is for Law Enforcement and will have the QR scanner on it as well as the serial code entry box
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class LawEnforcement extends Component {
    constructor(props) {
        super(props)
        this.state= ({
            email: '',
            isOpen: false,
            serial: '',
        });
        this.submitSerial = this.submitSerial.bind(this);
    }

    onSignoutPress = () => {
        firebase.auth().signOut().then(() => {
            Alert.alert("Successfully signed out")
        }, (error) => {
            Alert.alert(error.message);
        });
        this.props.navigation.navigate('Login');
    }

    barcodeRecognized = e => {
        this.setState({serial: e.data});
    }

    submitSerial(s) {
        this.setState({serial: s});
    }

    render(){
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    LawEnforcementPage
                </Text>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate("QRScanner", {submitSerial: this.submitSerial})}>
                    <Text style={Typography.buttonText}>
                        Scan QR Code
                    </Text>
                </TouchableOpacity>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Serial Number"
                    placeholderTextColor='#ffffff'
                    ref={(input) => this.serial = input}
                    onChangeText={(serial) => this.setState({serial})}
                    value={this.state.serial} 
                    />
                </View>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate("ContractOverview", {contractAddress: this.state.serial})}>
                    <Text style={Typography.buttonText}>
                        Search Serial
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
