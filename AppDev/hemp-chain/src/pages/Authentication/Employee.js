//this is the page where an employee of any agency will be able to register an account
import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class EmployeeReg extends Component {
  finishReg() {
    Actions.finish();
  }

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Enter Operating State"
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.opState = input}
                    onSubmitEditing={() => this.firstName.focus()}
                    />
                </View>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Enter Company Name"
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.firstName = input}
                    onSubmitEditing={() => this.lastName.focus()}
                    />
                </View>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Employee First Name"
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.lastName = input}
                    onSubmitEditing={() => this.adminEmail.focus()}
                    />
                </View>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Employee Last Name"
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.lastName = input}
                    onSubmitEditing={() => this.adminEmail.focus()}
                    />
                </View>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Employee Email"
                    selectionColor="#ffffff"
                    keyboardType='email-address'
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.adminEmail=input}
                    onSubmitEditing={() => this.password.focus()}
                    />
                </View>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Employee Password"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.password=input}
                    />
                </View>
                <TouchableOpacity style={Spacing.buttonContainer} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={Typography.buttonText}>
                        Finish Registration
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
