//This will be the display page for when a regulator wants to search up a transaction
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

export default class SearchTransaction extends Component{
    constructor(props) {
        super(props)
        this.state = ({
            entry: '',
        });
        this.information = this.information.bind(this);
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

    information() {
        console.log("Searching for "+ this.state.entry)
        this.props.navigation.goBack();
    }


    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                   Search Transaction Page
                </Text>
                <Text style={Typography.buttonText}>
                Enter Serial Number, Person, or Buisness Below
                </Text>
                <TextInput style={UserInterface.inputBox}
                 placeholder="ID, Person, or Buisness"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 value={this.state.entry}
                 onChangeText={(text) => this.setState({entry: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />                
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate("ContractTable")}>
                    <Text style={Typography.buttonText}>
                        Search
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.goBack()}>
                    <Text style={Typography.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.onSignoutPress(this.state.email)}>
                    <Text style={Typography.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
