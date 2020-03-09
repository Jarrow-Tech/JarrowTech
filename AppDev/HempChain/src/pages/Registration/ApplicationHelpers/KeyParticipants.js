//this is the page where an employee of any agency will be able to register an account
import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  ActionSheetIOS,
} from 'react-native';


import { Typography, Spacing, UserInterface, Buttons } from '../../../styles/index';
import { ScrollView } from 'react-native-gesture-handler';

export default class KeyParticipants extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            keyPar1: ' ',
            keyPar2: ' ',
            keyPar3: ' ',
            keyPar4: ' ',
            keyPar5: ' ',

    });}


    render() {
        return(
            <View style={Spacing.colorContainer}>

                
                <TextInput style={UserInterface.inputBox}
                 placeholder="Key Participant #1"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.keyPar1 = input}
                />
                  <TextInput style={UserInterface.inputBox}
                 placeholder="Key Participant #2"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.keyPar2 = input}
                />
                  <TextInput style={UserInterface.inputBox}
                 placeholder="Key Participant #3"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.keyPar3 = input}
                />
                  <TextInput style={UserInterface.inputBox}
                 placeholder="Key Participant #4"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.keyPar4 = input}
                />
                  <TextInput style={UserInterface.inputBox}
                 placeholder="Key Participant #5"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.keyPar5 = input}
                />                  

                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.goBack()}>
                    <Text style={Typography.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Spacing.buttonContainer} onPress={() => this.props.navigation.navigate('ProducingAreas')}>
                    <Text style={Typography.buttonText}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
