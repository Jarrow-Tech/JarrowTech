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
} from 'react-native';

import Prompt from 'react-native-input-prompt';



import { Typography, Spacing, UserInterface, Buttons } from '../../../../styles/index';

export default class GPSCoordinates extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            longitude: 0,
            latitude: 0,
        });
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

    coordinates() {
        this.props.route.params.coordinates(this.state);
        this.props.navigation.goBack();
    }

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    GPS Location page
                </Text>
                <Text style={Typography.buttonText}>
                    Please Enter the Coordinates in Decimal Degree Format
                </Text>
                <TextInput style={UserInterface.inputBox}
                 placeholder="Longitude"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 onChangeText={(input) => this.setState({longitude: input})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />
                  <TextInput style={UserInterface.inputBox}
                 placeholder="Latitude"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 onChangeText={(input) => this.setState({latitude: input})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />
                
                <TouchableOpacity style={Buttons.button} onPress={() => this.coordinates()}>
                    <Text style={Typography.buttonText}>
                        Log Coordinates
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Buttons.button} onPress={()=>this.props.navigation.goBack()}>
                    <Text style={Typography.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
