//this is the page where an employee of any agency will be able to register an account
import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';

import Logo from '../../components/Logo';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class EmployeeReg extends Component {
  finishReg() {
    Actions.finish();
  }

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <TextInput style={UserInterface.inputBox}
                 placeholder="Enter Operating State"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.opState = input}
                 onSubmitEditing={() => this.firstName.focus()}
                />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Enter Company Name"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.firstName = input}
                 onSubmitEditing={() => this.lastName.focus()}
                />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Employee First Name"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.lastName = input}
                 onSubmitEditing={() => this.adminEmail.focus()}
                />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Employee Last Name"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.lastName = input}
                 onSubmitEditing={() => this.adminEmail.focus()}
                />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Employee Email"
                 selectionColor="#ffffff"
                 keyboardType='email-address'
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.adminEmail=input}
                 onSubmitEditing={() => this.password.focus()}
                />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Employee Password"
                 secureTextEntry={true}
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.password=input}
                />
                <TouchableOpacity style={Spacing.buttonContainer} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={Typography.buttonText}>
                        Finish Registration
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
