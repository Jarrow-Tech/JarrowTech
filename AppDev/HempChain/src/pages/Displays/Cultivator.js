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

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class Cultivator extends Component{
    constructor(props) {
        super(props)
        this.state= ({ })
        this.harvest = this.harvest.bind(this);
        this.buy = this.buy.bind(this);
        this.sell = this.sell.bind(this);
        this.coordinates= this.coordinates.bind(this);
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
        console.log("Variety Name: "+ vals.cropName)
        console.log("Lot # :" + vals.lotNumb + " was Harvested beginning " + vals.harvestDate + " from " + vals.growingLocation + " location.");
        console.log("Harvested " + vals.cropSize + " of Hemp " + vals.cropType);
    }

    coordinates(vals) {
        // this is the function called from the GPSCoordinates pg
        // vals contains the logitude and latitude details gathered from that page
        console.log("Longitude: " + vals.longitude + "Latitude: " + vals.latitude)
        
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
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('HarvestInformation', {harvest: this.harvest},{coordinates: this.coordinates})}>
                    <Text style={Typography.buttonText}>
                        Log Harvest
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('CultTransaction')}>
                    <Text style={Typography.buttonText}>
                        Log Transaction
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('NotAvailable')}>
                    <Text style={Typography.buttonText}>
                        Marketplace
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
