//The pages folder will contain the pages the user will see
//This is the login page

//This imports our tools that we need from React
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class Login extends Component {

  //LoginForm is the page that the user will see
    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Logo />
                <LoginForm navigation={this.props.navigation} />
                <View style={Spacing.signupTextContainer}>
                    <Text style={Typography.signupText}>
                        Dont have an Account?
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text style={Buttons.signupButton}>
                            Register Here!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
