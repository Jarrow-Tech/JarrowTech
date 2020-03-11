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


let applicantTypes = ['Individual', 'Buisness']
let applicantTags = ['Farmer', 'Factory']

export default class ProducingAreas extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            email: " ",
            password: " ",
            firstName: " ",
            lastName: " ",
            operatingState: " ",
            applicant:" ",
            applicantDisplay:" ",
            city: " ",
            badgeID: " ",
            hempCultID: " ",
            isDialogVisibleLaw: false,
            isDialogVisibleCult: false,
            dialogVisable: false,
    });}







      // generate a picker for ios instead of a React Picker
      generatePicker(opts) {
        ActionSheetIOS.showActionSheetWithOptions({
            options: opts
        },
        (buttonIndex) => {
            // switch based on which picker is invoked (indicated by the 'opts' passed as arguments)
             if (opts == applicantTypes) {
                this.setState({applicantDisplay: applicantTypes[buttonIndex]});
                this.setState({applicant: applicantTags[buttonIndex]});
            } else {
                // opts didn't match any expected input.
                // somehow generatePicker was called from an unexpected location
                // TODO: error code subject to change once we decide on a scheme to name them
                Alert.alert("Something has gone wrong. Please retry registration. Error Code 1001");
            }
        });
    }


    onApplicantChange(itemValue) {
        this.setState({applicant: itemValue});
        if (itemValue == "NULL") {
            Alert.alert("Must Choose a Valid Applicant Type");
        }
    }

    render() {
        return(
            <View style={Spacing.colorContainer}>

                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.goBack()}>
                    <Text style={Typography.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Spacing.buttonContainer} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={Typography.buttonText}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
