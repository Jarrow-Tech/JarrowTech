//This page is where the user is directed to when they presss 'forgot password'
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

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
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                 placeholder="Email"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 keyboardType="email-address"
                 value={this.state.email}
                 onChangeText={(text) => this.setState({email: text})}
                 onSubmitEditing={() => this.password.focus()}
                  />
                <TouchableOpacity style={styles.button} onPress={this.onResetPasswordPress}>
                    <Text style={styles.buttonText}>
                        Send Reset Link
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

//stylesheet helps us in formating the display and objects
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
