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

    constructor(props) {
        super(props)
        this.state = ({
            companyName: " ",
            email: " ",
            firstName: " ",
            lastName: " ",
            operatingState: " ",
            password: " ",
        });
    }

    finishReg() {
        Actions.finish();
    }

    // adds the user to the Firebase db 
    signUpUser = (email, password) => {
        if (this.state.password.length < 8) {
            alert("Please enter at least 8 characters for the password")
            return;
        }

        // pass the entered information to Firebase - for now output it to console
        console.log("Operating State: " + this.state.operatingState)
        console.log("Company Name: " + this.state.companyName)
        console.log("First Name: " + this.state.firstName)
        console.log("Last Name: " + this.state.lastName)
        console.log("Email: " + this.state.email)

        this.props.navigation.navigate("Login")
    }

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Enter Operating State"
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.opState = input}
                    onChangeText={(operatingState) => this.setState({operatingState})}
                    onSubmitEditing={() => this.firstName.focus()}
                    />
                </View>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Enter Company Name"
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.firstName = input}
                    onChangeText={(companyName) => this.setState({companyName})}
                    onSubmitEditing={() => this.lastName.focus()}
                    />
                </View>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Employee First Name"
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.lastName = input}
                    onChangeText={(firstName) => this.setState({firstName})}
                    onSubmitEditing={() => this.adminEmail.focus()}
                    />
                </View>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Employee Last Name"
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.lastName = input}
                    onChangeText={(lastName) => this.setState({lastName})}
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
                    onChangeText={(email) => this.setState({email})}
                    onSubmitEditing={() => this.password.focus()}
                    />
                </View>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Employee Password"
                    secureTextEntry={true}
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.password=input}
                    onChangeText={(password) => this.setState({password})}
                    />
                </View>
                <TouchableOpacity style={Spacing.buttonContainer} onPress={() => this.signUpUser(this.state.email, this.state.password)}>
                    <Text style={Typography.buttonText}>
                        Finish Registration
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
