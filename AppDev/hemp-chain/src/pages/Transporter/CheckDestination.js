//This will be the display page for when a regulator wants to search up a transaction
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class CheckDestination extends Component{
    constructor(props) {
        super(props)
        this.state= ({
            email: '',
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

    searchSerial = () => {
        this.props.route.params.checkDestination(this.state.serial);
        this.props.navigation.goBack();
    }

    submitSerial(s) {
        this.setState({serial: s});
    }

    barcodeRecognized = e => {
        this.setState({serial: e.data})
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
                <TextInput style={UserInterface.inputBox}
                 placeholder="Serial Number"
                 placeholderTextColor='#ffffff'
                 ref={(input) => this.serial = input}
                 onChangeText={(serial) => this.setState({serial})}
                 value={this.state.serial} />
                <TouchableOpacity style={Buttons.button} onPress={() => this.searchSerial()}>
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
