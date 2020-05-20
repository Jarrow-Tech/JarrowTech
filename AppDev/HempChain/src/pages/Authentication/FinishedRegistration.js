// this is the page that law enforcement and Regulators will see once they create an account
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
import Logo from './components/Logo';
import LoginForm from './components/LoginForm';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state= ({
            email: '',
            isOpen: false,
    });}

    onSignoutPress = () => {
        firebase.auth().signOut().then(() => {
            Alert.alert("Successfully signed out")
        }, (error) => {
            Alert.alert(error.message);
        });
        this.props.navigation.navigate('Login');
    }

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    Please Wait 24hrs for a Response from JarrowTech!
                        Thank You for Choosing JarrowTech!
                </Text>
                <TouchableOpacity style={Buttons.button} onPress={()=>this.onSignoutPress(this.state.email)}>
                    <Text style={Typography.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
