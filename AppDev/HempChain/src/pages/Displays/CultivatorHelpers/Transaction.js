//This page is for the cultivator to log transaction
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

import Prompt from 'react-native-input-prompt';

//See sign-up pg for notes
import { user } from '../../../../App';

import { Typography, Spacing, UserInterface, Buttons } from '../../../styles/index';

export default class CultTransaction extends Component{
    constructor(props) {
        super(props)
        this.state = ({
            cultivatorID: 0,
            dateShipped: ' ',
            dateTransaction: ' ',
            dateArrival: ' ',
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
        console.log("After a transaction has occured a serial numer is created for it")
        this.props.navigation.goBack();
    }
    image(){
        console.log("The farmer can attach images to the transaction")
        this.props.navigation.goBack();

    }


    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                   Cultivator Transaction Page
                </Text>
                <Text style={Typography.buttonText}>
                    Cultivator will enter following info pertaining to transaction
                </Text>
                <TextInput style={UserInterface.inputBox}
                 placeholder=" Enter JarrowTech/Hemp Cultivator ID"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 value={this.state.hempSerial}
                 onChangeText={(text) => this.setState({cultivatorID: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  /> 
                <TextInput style={UserInterface.inputBox}
                 placeholder="Enter Transaction Date"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 value={this.state.product}
                 onChangeText={(text) => this.setState({dateTransaction: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  /> 
                  <TextInput style={UserInterface.inputBox}
                 placeholder="Enter Date Shipped"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 value={this.state.product}
                 onChangeText={(text) => this.setState({dateShipped: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />                 
                  <TextInput style={UserInterface.inputBox}
                 placeholder="Enter Date Arrival"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 value={this.state.product}
                 onChangeText={(text) => this.setState({dateArrival: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />                                
                <TouchableOpacity style={Buttons.button} onPress={() => this.log()}>
                    <Text style={Typography.buttonText}>
                        Log
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.image()}>
                    <Text style={Typography.buttonText}>
                        Attach Images
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
