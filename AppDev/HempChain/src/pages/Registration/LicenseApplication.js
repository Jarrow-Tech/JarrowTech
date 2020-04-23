//this is the page where the user will fill out the application to submit to the WDA
// when teh user presses the NExt button their applicant data needs ot be sent to firebase 
import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  ActionSheetIOS,
  ScrollView,
} from 'react-native';

import Logo from '../../components/Logo';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';


let applicantTypes = ['Individual', 'Buisness']
let applicantTags = ['Farmer', 'Factory']

export default class LicenseApplicaton extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            email: " ",
            firstName: " ",
            lastName: " ",
            dob: " ",
            applicant:" ",
            applicantDisplay:" ",
            principalAddress: " ",
            buisType: " ",
            mailingAddress: " ",
            phoneNumb:" ",
            altNumb: " ",
            contactName: " ",
            ein: " ",
            isDialogVisibleBuis: false,
            isDialogVisibleCult: false,
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
                this.promptChecker(applicantTags[buttonIndex]);

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

    promptChecker = (itemValue) => {
        this.setState({agency: itemValue});
        if (itemValue == "Factory") {
            this.setState({isDialogVisibleBuis: true})
            
        }else{
            this.setState({isDialogVisibleBuis: false})
        }

        if (itemValue == "Farmer") {
            this.setState({isDialogVisibleCult: true})
        }else{
            this.setState({isDialogVisibleCult: false})
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
                        <Picker.Item label="Individual" value="Farmer" />
                        <Picker.Item label="Buisness" value="Factory" />
                    </Picker>
                }    


                 {(this.state.isDialogVisibleCult)?
                    <View>
                        <TextInput 
                          style={UserInterface.inputBox}
                          placeholder="First Name"
                          placeholderTextColor="#ffffff"
                          ref={(input) => this.firstName = input}
                          onChangeText={(firstName) => this.setState({firstName})}
                          onSubmitEditing={() => this.lastName.focus()}
                          /> 
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Last Name"
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.lastName = input}
                         onChangeText={(lastName) => this.setState({lastName})}
                         onSubmitEditing={() => this.dob.focus()}
                          />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="DOB"
                         selectionColor="#ffffff"
                         keyboardType= 'number-pad'
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.dob=input}
                         onSubmitEditing={() => this.password.focus()}
                         />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Principal Address"
                         selectionColor="#ffffff"
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.principalAddress=input}
                         onSubmitEditing={() => this.password.focus()}
                         />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Mailing Address"
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.mailingAddress=input}
                         onSubmitEditing={() => this.phoneNumb.focus()}
                         />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Phone Number"
                         selectionColor="#ffffff"
                         keyboardType='email-address'
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.phoneNumb=input}
                         onSubmitEditing={() => this.altNumb.focus()}
                         />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Alt. Number"
                         selectionColor="#ffffff"
                         keyboardType='email-address'
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.altNumb=input}
                         onSubmitEditing={() => this.email.focus()}
                         />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Email Address"
                         selectionColor="#ffffff"
                         keyboardType='email-address'
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.email=input}
                         />                        
                    </View>
                   : null
                 }


                 {(this.state.isDialogVisibleBuis)?
                    <View>
                        <TextInput editable={this.state.isDialogVisibleBuis}
                          style={UserInterface.inputBox}
                          placeholder="Type of Buisness"
                          placeholderTextColor="#ffffff"
                          ref={(input) => this.buisType = input}
                          onChangeText={(buisType) => this.setState({buisType})}
                          onSubmitEditing={() => this.contactName.focus()}
                          /> 
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Contact Name"
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.contactName= input}
                         onSubmitEditing={() => this.adminEmail.focus()}
                          />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="DOB"
                         selectionColor="#ffffff"
                         keyboardType='number-pad'
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.dob=input}
                         onSubmitEditing={() => this.principalAddress.focus()}
                         />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Principal Address"
                         selectionColor="#ffffff"
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.principalAddress=input}
                         onSubmitEditing={() => this.mailingAddress.focus()}
                         />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Mailing Address"
                         selectionColor="#ffffff"
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.password=input}
                         onSubmitEditing={() => this.phoneNumb.focus()}
                         />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Phone Number"
                         selectionColor="#ffffff"
                         keyboardType= 'number-pad'
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.adminEmail=input}
                         onSubmitEditing={() => this.altNumb.focus()}
                         />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Alt. Number"
                         selectionColor="#ffffff"
                         keyboardType= 'number-pad'
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.altNumb=input}
                         onSubmitEditing={() => this.email.focus()}
                         />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="Email Address"
                         selectionColor="#ffffff"
                         keyboardType='email-address'
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.adminEmail=input}
                         onSubmitEditing={() => this.ein.focus()}
                         />
                        <TextInput style={UserInterface.inputBox}
                         placeholder="EIN# "
                         selectionColor="#ffffff"
                         keyboardType= 'number-pad'
                         placeholderTextColor="#ffffff"
                         ref={(input) => this.adminEmail=input}
                         />
                    </View>
                   : null
                 }                
                

                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={Typography.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={Spacing.buttonContainer} onPress={() => this.props.navigation.navigate('KeyParticipants')}>
                    <Text style={Typography.buttonText}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
