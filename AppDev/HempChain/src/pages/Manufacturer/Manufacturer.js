//Display page for users who are 'Processors/ Manufactuers'
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class ManufProcs extends Component {
    constructor(props) {
        super(props)
        this.state= ({
            email: '',
            isOpen: false,
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

    submitSerial = (s) => {
        this.setState({serial: s})
    }

    searchSerial = () => {
        console.log("[ProcessManuf] Searching for serial: " + this.state.serial);
    }

    barcodeRecognized = e => {
        this.setState({serial: e.data})
    }

    render(){
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    Process/Manufacturer Page
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
                    captureAudio={false} 
                    />
                </View>
                <TouchableOpacity style={Buttons.button} onPress={() => this.searchSerial()}>
                    <Text style={Typography.buttonText}>
                        Search Serial
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('LogTransaction')}>
                    <Text style={Typography.buttonText}>
                        Log Transactions
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
