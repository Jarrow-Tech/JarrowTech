// This page is for Law Enforcement and will have the QR scanner on it as well as the serial code entry box
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

import AppCamera from '../../components/AppCamera'
import Prompt from 'react-native-input-prompt';
import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';

//See sign-up pg for notes
import { user } from '../../../App';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class LawEnforcement extends Component {
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
    }

    // callback function to set the serial number from camera
    getSerial = (serialNumber) => {
        this.setState({serial: serialNumber})
    }

    render(){
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    LawEnforcementPage
                </Text>
                <AppCamera 
                    setSerial = {this.getSerial}
                    />
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Serial Number"
                    placeholderTextColor='#ffffff'
                    ref={(input) => this.serial = input}
                    onChangeText={(serial) => this.setState({serial})}
                    value={this.state.serial} 
                    />
                </View>
                <TouchableOpacity style={Buttons.button} onPress={() => this.submitSerial()}>
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
