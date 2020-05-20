//This will be the display page for a user whos' agencey type is Cultivator
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Typography, Spacing, Buttons } from '../../styles/index';

export default class Selling extends Component{
    constructor(props) {
        super(props)
        this.state= ({ });
        this.sell = this.sell.bind(this);
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


    sell() {
        this.props.route.params.sell(this.state);
        this.props.navigation.goBack();
    }

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    Cultivator Page
                </Text>
                <Text style={Typography.buttonText}>
                    Selling Page
                </Text>
                <TouchableOpacity style={Buttons.button} onPress={() => this.sell()}>
                    <Text style={Typography.buttonText}>
                        Sell Stuff
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
