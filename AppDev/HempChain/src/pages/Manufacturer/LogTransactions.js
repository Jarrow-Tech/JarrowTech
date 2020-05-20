//This page is for the process and manufacturers to log what the hemp that they have taken in gets processed too 
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class LogTransaction extends Component{
    constructor(props) {
        super(props)
        this.state = ({
            product: '',
            hempSerial: 0,
        });
        this.log= this.log.bind(this);
    }

    //Firebase signout function
    onSignoutPress = () => {
        firebase.auth().signOut().then(() => {
            Alert.alert("Successfully signed out")
        }, (error) => {
            Alert.alert(error.message);
        });
        this.props.navigation.navigate('Login');
    }

    log() {
        console.log("Hemp Shipment "+ this.state.hempSerial + " was porcessed into "+this.state.product)
        this.props.navigation.goBack();
    }


    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                   Log Transaction Page
                </Text>
                <Text style={Typography.buttonText}>
                    Enter Serial ID
                </Text>
                <TextInput style={UserInterface.inputBox}
                 placeholder="Serial Number"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 value={this.state.hempSerial}
                 onChangeText={(text) => this.setState({hempSerial: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  /> 
                  <Text style={Typography.buttonText}>
                    Enter Product
                </Text>
                <TextInput style={UserInterface.inputBox}
                 placeholder="Poduct"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 value={this.state.product}
                 onChangeText={(text) => this.setState({product: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />                 
                <TouchableOpacity style={Buttons.button} onPress={() => this.log()}>
                    <Text style={Typography.buttonText}>
                        Log
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.goBack()}>
                    <Text style={Typography.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
