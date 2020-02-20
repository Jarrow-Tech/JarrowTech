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

export default class SignUp extends Component {

  //RegisterForm is where the buttons that the user presses are located
    render() {
        return(
            <View style={styles.container}>
                <Logo />
                <RegisterForm type="Register" navigation={this.props.navigation} />
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>
                        Already Registered?
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.signupButton}>
                            Log in Now!
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signupTextCont: {
        flexGrow: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signupText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 16
    },
    signupButton: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
    },
});
