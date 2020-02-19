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

export default class Login extends Component {

  //LoginForm is the page that the user will see
    render() {
        return(
            <View style={styles.container}>
                <Logo />
                <LoginForm navigation={this.props.navigation} />
                <View style={styles.signupTextCont}>
                    <Text style={styles.signupText}>
                        Dont have an Account?
                    </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
                        <Text style={styles.signupButton}>
                            Register Here!
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
