//This is the login form page
//This is the pg that formats what the login pg will look like

//Firebase is the database that will have our user accounts on it
import * as firebase from 'firebase';

import * as webHelp from '../utility/webHelper';

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert
} from 'react-native';

import * as RootNavigation from '../RootNavigation';

import { CommonActions } from '@react-navigation/native';

import { user } from '../../App';

import { Typography, Spacing, UserInterface, Buttons } from '../styles/index';

//Setting the this.state in a constructor allows us to call and manipulate it easier
export default class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            email: '',
            password: '',
            agency: 'none',
    });}

    //This is the funciton to sign a user in if they have an account created
    loginUser = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
            if (firebase.auth().currentUser.emailVerified == false) {
                Alert.alert("Please Verify Email Address");
            } else if (firebase.auth().currentUser.emailVerified == true) {
                firebase.database().ref("Users/" + firebase.auth().currentUser.uid + "/agency").once('value').then((snapshot) => {
                    console.log(snapshot.val());
                    let temp = "";
                    // switch (snapshot.val()) {
                    //     case 'Police/Highway': { console.log('hit'); temp = 'LawEnforcement' };
                    //     case 'Farmer': { console.log('hit'); temp = 'Cultivator' };
                    //     case 'Factory': { temp = 'ManufacturingProcess' };
                    //     default: temp = 'SignUp';
                    // } LabTester, Lab
                    if(snapshot.val() == 'LabTester'){
                        this.props.navigation.navigate('Lab');
                    } else if(snapshot.val() == 'Trucker'){
                        this.props.navigation.navigate('Transporter');
                    } else if(snapshot.val() == 'Regulator'){
                        this.props.navigation.navigate('Regulator');
                    } else if (snapshot.val() == 'Police/Highway') {
                        this.props.navigation.navigate('LawEnforcement');
                    } else if (snapshot.val() == 'Farmer') {
                        this.props.navigation.navigate('Cultivator');
                    } else if (snapshot.val() == 'Factory') {
                        this.props.navigation.navigate('ManufacturingProcess');
                    } else {
                        Alert.alert("Something has gone wrong. Please log in again. If the problem persists, contact our Help Center.");
                        this.props.navigation.navigate('Login');
                    }
                })
            }
        }, (error) => {
            Alert.alert(error.message);
        });
    }

    //keyboardtype allows us to specify what type to use
    //onSubmitEditing takes us straight to the password textinput after entering email
    //securetextentry dots out the input text
    // {this.props.type} turns the LOGIN and SIGN-UP on the bottom of the screens into props
    // allowing them to be more easily accesed in the routes folder.
    render() {
        return(
            <View style={Spacing.container}>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Email"
                    placeholderTextColor="#ffffff"
                    selectionColor="#ffffff"
                    keyboardType= "email-address"
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                    onSubmitEditing={() => this.password.focus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                    />
                </View>
                <View style={UserInterface.inputBox}>
                    <TextInput style={UserInterface.inputText}
                    placeholder="Password"
                    secureTextEntry= {true}
                    placeholderTextColor="#ffffff"
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text})}
                    ref={(input) => this.password=input}
                    autoCorrect={false}
                    />
                </View>
                <TouchableOpacity style={Buttons.button} onPress={() => this.loginUser(this.state.email, this.state.password)}>
                    <Text style={Typography.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('TestPage')}>
                    <Text style={Typography.buttonText}>
                        Test
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Typography.signupText} onPress={() => this.props.navigation.navigate('ForgotPassword')}>
                    <Text style={Typography.buttonText}>
                        Forgot Password?
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
