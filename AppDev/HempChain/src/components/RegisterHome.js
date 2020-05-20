//This is the page that will direct them to sign-up/ create an account as either a buisness or an employee
//pressing on either of the buttons will direct the user to the specific pages.
//Currently the "Register as Employee" button dosent direct anywhere at the moment. 11/11/19
import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';

import { Typography, Spacing, UserInterface, Buttons } from '../styles/index';

export default class RegisterForm extends Component {

    //Pressing te buttons will route the users to the specified pages
    render() {
        return(
            <View style={Spacing.container}>
                <TouchableOpacity style={Buttons.buttonRegister} onPress={() => this.props.navigation.navigate('BusinessRegistration')}>
                    <Text style={Typography.buttonText}>
                        Register as a Business/Department
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.buttonRegister} onPress={() => this.props.navigation.navigate('EmployeeRegistration')}>
                    <Text style={Typography.buttonText}>
                        Register as an Employee
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
