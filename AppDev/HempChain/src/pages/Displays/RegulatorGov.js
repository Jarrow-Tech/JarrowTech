// Display page for governmnet Regulators i.i Department of Agricultures
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Prompt from 'react-native-input-prompt';
import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';

//See sign-up pg for notes
import { user } from '../../../App';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class Regulator extends Component {
    constructor(props) {
        super(props)
        this.state= ({
            email: '',
            isOpen: false,
    });}

    onSignoutPress = () => {
        firebase.auth().signOut().then(() => {
            Alert.alert("Successfully signed out")
        }, (error) => {
            Alert.alert(error.message);
        });
        this.props.navigation.navigate('Login');
    }
   

    render(){
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    Regulator/Government Page
                </Text>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('SearchTransaction')}>
                    <Text style={Typography.buttonText}>
                        Search Transaction
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('Hempmap')}>
                    <Text style={Typography.buttonText}>
                        Map
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={()=>this.onSignoutPress(this.state.email)}>
                    <Text style={Typography.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
