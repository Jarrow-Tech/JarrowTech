//Lab users will enter the Harvest ID number then be prompted to another page where they will enter COA information
// for now this is just the preliminary page
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

export default class LogReport extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            thcLevels: ' ',
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
        console.log("Hemp Shipment "+ this.state.hempSerial + " was tested and had "+this.state.thcLevels+" % in THC.")
        this.props.navigation.goBack();
    }


    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                   Lab Report Page
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
                    Enter THC Levels
                </Text>
                <TextInput style={UserInterface.inputBox}
                 placeholder="THC Levels "
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 value={this.state.thcLevels}
                 onChangeText={(text) => this.setState({thcLevels: text})}
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
