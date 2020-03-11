//This will be the display page for a user whos' agencey type is Cultivator
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  ActionSheetIOS
} from 'react-native';

import Prompt from 'react-native-input-prompt';

//See sign-up pg for notes
import { user } from '../../../../App';

import { Typography, Spacing, UserInterface, Buttons } from '../../../styles/index';

let agencies = ['Indoor','Outdoor'];
let agenciesTags = ['Indoor','Outdoor'];


export default class HarvestInformation extends Component{
    constructor(props) {
        super(props)
        this.state = ({
            lotNumb: 0,
            cropName: ' ',
            harvestDate: ' ',        
            cropSize: 0,
            cropType: '',
            locationDisplay:" ",
            growingLocation: ' ',
            thcLevel: ' ',
        });
        this.harvest = this.harvest.bind(this);
        this.coordinates= this.coordinates.bind(this);
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

    harvest() {
        this.props.route.params.harvest(this.state);
        this.props.navigation.goBack();
    }

    coordinates(vals) {
        // this is the function called from the GPSCoordinates pg
        // vals contains the logitude and latitude details gathered from that page
        console.log("Longitude: " + vals.longitude + " Latitude: " + vals.latitude)
        
    }


      //when the user creates an account this funciton sets agencey specific feilds to be 'N/A' but
    // will be changes when the uer specifies the corresponding agencey
    onLocationChange(itemValue) {
        this.setState({growingLocation: itemValue});
        if (itemValue == "NULL") {
            Alert.alert("Must Choose a Valid Location");
        }
    }

    // generate a picker for ios instead of a React Picker
    generatePicker(opts) {
        ActionSheetIOS.showActionSheetWithOptions({
            options: opts
        },
        (buttonIndex) => {
             if (opts == agencies) {
                this.setState({locationDisplay: agencies[buttonIndex]});
                this.setState({growingLocation: agenciesTags[buttonIndex]});
            } else {
                // opts didn't match any expected input.
                // somehow generatePicker was called from an unexpected location
                // TODO: error code subject to change once we decide on a scheme to name them
                Alert.alert("Something has gone wrong. Please retry registration. Error Code 1001");
            }
        });
    }
  

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    Enter Harvest Details Below
                </Text>
                <TextInput style={UserInterface.inputBox}
                 placeholder="Lot #"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 keyboardType= 'numbers-and-punctuation'
                 value={this.state.lotNumb}
                 onChangeText={(input) => this.setState({lotNumb: input})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />

                <TextInput style={UserInterface.inputBox}
                 placeholder="Variety Name"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 onChangeText={(text) => this.setState({cropName: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />

                <TextInput style={UserInterface.inputBox}
                 placeholder="Harvest Start Date"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 onChangeText={(text) => this.setState({harvestDate: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />

                {(Platform.OS === 'ios') ?
                    <TouchableOpacity style={Buttons.iosPickerButton} onPress={() => this.generatePicker(agencies)}>
                        <Text style={Typography.buttonText}>
                            {(this.state.locationDisplay == " ") ? "Planting Location" : this.state.locationDisplay}
                        </Text>
                    </TouchableOpacity> :
                    <Picker
                        style={UserInterface.inputBox}
                        mode="dropdown"
                        selectedValue={this.state.growingLocation}
                        onValueChange={(itemValue) => this.onLocationChange(itemValue)}>
                        <Picker.Item label="Choose from the two" value="NULL"/>
                        <Picker.Item label="Indoor" value="Indoor" />
                        <Picker.Item label="Outdoor" value="Outdoor" />
                    </Picker>
                }  

                <TextInput style={UserInterface.inputBox}
                 placeholder="Enter Plant or Seed"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 onChangeText={(text) => this.setState({cropType: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Grow Size"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 onChangeText={(input) => this.setState({cropSize: input})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />
                
                   <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('GPS', {coordinates: this.coordinates})}>
                    <Text style={Typography.buttonText}>
                        GPS Coordinates
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('TestResults')}>
                    <Text style={Typography.buttonText}>
                        Testing/Certificate of Analysis
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={() => this.harvest()}>
                    <Text style={Typography.buttonText}>
                        Log Harvest Details
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
