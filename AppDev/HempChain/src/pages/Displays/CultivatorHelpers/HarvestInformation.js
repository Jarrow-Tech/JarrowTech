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

//See sign-up pg for notes
import { user } from '../../../../App';

import { Typography, Spacing, UserInterface, Buttons } from '../../../styles/index';

export default class HarvestInformation extends Component{
    constructor(props) {
        super(props)
        this.state = ({
            cropSize: 0,
            cropType: '',
        });
        this.harvest = this.harvest.bind(this);
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


    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    Cultivator Page
                </Text>
                <Text style={Typography.buttonText}>
                    Enter Harvest Details Below
                </Text>
                <TextInput style={UserInterface.inputBox}
                 placeholder="Crop Size"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 value={this.state.cropSize}
                 onChangeText={(text) => this.setState({cropSize: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Crop Type"
                 placeholderTextColor="#ffffff"
                 selectionColor="#ffffff"
                 value={this.state.cropType}
                 onChangeText={(text) => this.setState({cropType: text})}
                 autoCapitalize="none"
                 autoCorrect={false}
                  />
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
                <TouchableOpacity style={Buttons.button} onPress={() => this.onSignoutPress(this.state.email)}>
                    <Text style={Typography.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
