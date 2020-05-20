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

export default class Buying extends Component {
    constructor(props) {
        super(props)
        this.state = ({ });
        this.buy = this.buy.bind(this);
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

    buy() {
        this.props.route.params.buy(this.state);
        this.props.navigation.goBack();
    }

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    Cultivator Page
                </Text>
                <Text style={Typography.buttonText}>
                    Purchasing Page
                </Text>
                <TouchableOpacity style={Buttons.button} onPress={()=>this.buy()}>
                    <Text style={Typography.buttonText}>
                        Buy Stuff
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={()=>this.props.navigation.goBack()}>
                    <Text style={Typography.buttonText}>
                        Go Back
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
