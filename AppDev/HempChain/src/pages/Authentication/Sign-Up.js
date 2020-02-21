//This is the sign-up page
//This page is currently using the loginform's layout but will be changed 11/2/19 Carlton O. Wilcox

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterHome';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class SignUp extends Component {

  //RegisterForm is where the buttons that the user presses are located
    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Logo />
                <RegisterForm type="Register" navigation={this.props.navigation} />
                <View style={Spacing.signupTextContainer}>
                    <Text style={Typography.signupText}>
                        Already Registered?
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={Buttons.signupButton}>
                            Log in Now!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
