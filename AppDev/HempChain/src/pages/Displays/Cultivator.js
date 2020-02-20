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
import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';

//See sign-up pg for notes
import { user } from '../../../App';

// sub pages for Cultivator
import HarvestInformation from './CultivatorHelpers/HarvestInformation'
import Buying from './CultivatorHelpers/Buying'
import Selling from './CultivatorHelpers/Selling'

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
            <View style={styles.container}>
                <Text style={styles.buttonText}>
                    Cultivator Page
                </Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('HarvestInformation', {harvest: this.harvest})}>
                    <Text style={styles.buttonText}>
                        Log Harvest
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Buying', {buy: this.buy})}>
                    <Text style={styles.buttonText}>
                        Buy Product
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Selling', {sell: this.sell})}>
                    <Text style={styles.buttonText}>
                        Sell Product
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => this.onSignoutPress(this.state.email)}>
                    <Text style={styles.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#455a64',
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10,
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 12,
        alignContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    },
    signupText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 16
    },
});
