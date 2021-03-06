//This page is where the user is directed to when they presss 'forgot password'
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.state= ({
            email: ''
    });}

    //Firebase has its own reset password function which is used here
    onResetPasswordPress=()=>{
        firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
            Alert.alert("Password reset link has been sent to email.");
        }, (error)=>{
            Alert.alert(eror.message);
        });
    }

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    selectionColor="#ffffff"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                    onSubmitEditing={() => this.password.focus()}
                    />
                </View>
                <TouchableOpacity style={Buttons.button} onPress={this.onResetPasswordPress}>
                    <Text style={Typography.buttonText}>
                        Send Reset Link
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
