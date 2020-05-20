//This will be the display page for a user whos' agencey type is Cultivator
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import Prompt from 'react-native-input-prompt';
import Logo from '../Authentication/components/Logo';
import LoginForm from '../Authentication/components/LoginForm';

//See sign-up pg for notes
import { user } from '../../../App';

// sub pages for Cultivator
import HarvestInformation from './HarvestInformation'
import Buying from './Buying'
import Selling from './Selling'

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class Cultivator extends Component{
    constructor(props) {
        super(props)
        this.state= ({ })
        this.harvest = this.harvest.bind(this);
        this.buy = this.buy.bind(this);
        this.sell = this.sell.bind(this);
    ;}

    //Firebase signout function
    onSignoutPress = () => {
        firebase.auth().signOut().then(() => {
            Alert.alert("Successfully signed out")
        }, (error) => {
            Alert.alert(error.message);
        });
        this.props.navigation.navigate('Login');
    }

    harvest(vals) {
        // this is the function called from the HarvestInformation sub page
        // vals contains all the harvest details gathered from that page
        console.log("Harvested " + vals.cropSize + " amount of " + vals.cropType);
    }

    buy(vals) {
        // this is the function called from the Buying sub page
        // vals contains all of the buying information
        console.log("Buying products");
    }

    sell(vals) {
        // this is the function called from the Buying sub page
        // vals contains all of the selling information
        console.log("Selling Products");
    }

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    Cultivator Page
                </Text>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('HarvestInformation', {harvest: this.harvest})}>
                    <Text style={Typography.buttonText}>
                        Log Harvest
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('CultTransaction')}>
                    <Text style={Typography.buttonText}>
                        Log Transaction
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('Buying', {buy: this.buy})}>
                    <Text style={Typography.buttonText}>
                        Buy Product
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('Selling', {sell: this.sell})}>
                    <Text style={Typography.buttonText}>
                        Sell Product
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
