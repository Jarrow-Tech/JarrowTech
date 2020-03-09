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
                {(Platform.OS === 'ios') ?
                    <TouchableOpacity style={Buttons.iosPickerButton} onPress={() => this.generatePicker(applicantTypes)}>
                        <Text style={Typography.buttonText}>
                            {(this.state.applicantDisplay == " ") ? "Select an applicant type" : this.state.applicantDisplay}
                        </Text>
                    </TouchableOpacity> :
                    <Picker
                        style={UserInterface.inputBox}
                        mode="dropdown"
                        selectedValue={this.state.applicant}
                        onValueChange={(itemValue) => {this.onApplicantChange(itemValue)}}>
                        <Picker.Item label="Choose an Agency" value="NULL"/>
                        <Picker.Item label="Government" value="Regulator" />
                        <Picker.Item label="Law Enforcement" value="Police/Highway" />
                        <Picker.Item label="Cultivator" value="Farmer" />
                        <Picker.Item label="Processor/Manufacturer" value="Factory" />
                        <Picker.Item label="Transporter" value="Trucker" />
                    </Picker>
                }    








                <TextInput style={UserInterface.inputBox}
                 placeholder="Enter Company Name"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.firstName = input}
                 onSubmitEditing={() => this.lastName.focus()}
                />



                <TextInput style={UserInterface.inputBox}
                 placeholder="First Name"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.lastName = input}
                 onSubmitEditing={() => this.adminEmail.focus()}
                />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Last Name"
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.lastName = input}
                 onSubmitEditing={() => this.adminEmail.focus()}
                />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Principal Address"
                 selectionColor="#ffffff"
                 keyboardType='email-address'
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.adminEmail=input}
                 onSubmitEditing={() => this.password.focus()}
                />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Mailing Address"
                 secureTextEntry={true}
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.password=input}
                />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Phone Number"
                 selectionColor="#ffffff"
                 keyboardType='email-address'
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.adminEmail=input}
                 onSubmitEditing={() => this.password.focus()}
                />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Alt. Number"
                 selectionColor="#ffffff"
                 keyboardType='email-address'
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.adminEmail=input}
                 onSubmitEditing={() => this.password.focus()}
                />
                <TextInput style={UserInterface.inputBox}
                 placeholder="Email Address"
                 selectionColor="#ffffff"
                 keyboardType='email-address'
                 placeholderTextColor="#ffffff"
                 ref={(input) => this.adminEmail=input}
                 onSubmitEditing={() => this.password.focus()}
                />
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
