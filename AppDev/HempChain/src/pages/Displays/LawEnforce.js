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
import { RNCamera } from 'react-native-camera';

import Prompt from 'react-native-input-prompt';
import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';

//See sign-up pg for notes
import { user } from '../../../App';

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

    barcodeRecognized = e => {
        this.setState({serial: e.data})
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.buttonText}>
                    LawEnforcementPage
                </Text>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{
                        flex: 1,
                        width: '50%',
                    }}
                    barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    onBarCodeRead={this.barcodeRecognized}>
                </RNCamera>
                <TextInput style={styles.inputBox}
                 placeholder="Serial Number"
                 placeholderTextColor='#ffffff'
                 ref={(input) => this.serial = input}
                 onChangeText={(serial) => this.setState({serial})}
                 value={this.state.serial} />
                <TouchableOpacity style={styles.button} onPress={() => this.submitSerial()}>
                    <Text style={styles.buttonText}>
                        Search Serial
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.onSignoutPress(this.state.email)}>
                    <Text style={styles.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#455a64',
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10,
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
        alignContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    signupText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 16
    },
});
