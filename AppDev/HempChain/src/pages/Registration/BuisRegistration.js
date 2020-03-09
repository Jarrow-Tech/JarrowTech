//This is where users who choose a secific agency will register their buisness/affiliation
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  Alert,
  Button,
  ActionSheetIOS,
} from 'react-native';
import Prompt from 'react-native-input-prompt'
import { userRef } from '../../../App';

import Dialog from "react-native-dialog"

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

let states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Deleware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
    'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas',
    'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

let agencies = ['Government', 'Law Enforcement', 'Cultivator', 'Processor/Manufacturer', 'Transporter'];
let agenciesTags = ['Regulator', 'Police/Highway', 'Farmer', 'Factory', 'Trucker'];

export default class BusinessRegistration extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            email: " ",
            password: " ",
            firstName: " ",
            lastName: " ",
            operatingState: " ",
            agency:" ",
            agencyDisplay:" ",
            city: " ",
            badgeID: " ",
            hempCultID: " ",
            isDialogVisibleLaw: false,
            isDialogVisibleCult: false,
            dialogVisable: false,
    });}

    //Adds the user to the firebase db
    signUpUser = (email,password) => {

        if (this.state.password.length < 8) {
            alert("Please enter at least 8 characters for the password")
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email,password).then((data) => {
            firebase.auth().currentUser.sendEmailVerification().then(() => {
                Alert.alert("A Link has been sent to your email for verification")
            }).catch ((error) => {
                Alert.alert(error.message);
            });

            firebase.database().ref('Users/' + data.user.uid).set({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                operatingState: this.state.operatingState,
                agency: this.state.agency,
                city: this.state.city,
                badgeID: this.state.badgeID,
                hempCultID: this.state.hempCultID,
            });
        }, (error) => {
            Alert.alert(error.message);
        });
        this.props.navigation.navigate('Login');
    }

    //this function checks to see what agencey the user picked and if it they have choosen
    // either Cultivator or Law Enforcement a prompt will appear and ask them to enter either a badge number
    // or hemp cultivator ID
    promptChecker = (itemValue) => {
        this.setState({agency: itemValue});
        if (itemValue == "Police/Highway") {
            this.setState({isDialogVisibleLaw: true})
            
        }else{
            this.setState({isDialogVisibleLaw: false})
        }

        if (itemValue == "Farmer") {
            this.setState({isDialogVisibleCult: true, dialogVisable: true})
        }else{
            this.setState({isDialogVisibleCult: false})
        }
        if(itemValue == "Factory"){
            this.setState({dialogVisable: true})
        }
    }

    //when the user creates an account this funciton sets agencey specific feilds to be 'N/A' but
    // will be changes when the uer specifies the corresponding agencey
    onAgencyChange(itemValue) {
        this.setState({agency: itemValue});
        this.setState({badgeID: "N/A"});
        this.setState({hempCultID: "N/A"});
        if (itemValue == "NULL") {
            Alert.alert("Must Choose a Valid Agency");
        }
    }

    //Makes it to where they cannot choose a null State
    onLocationChange(itemValue) {
        this.setState({operatingState: itemValue});
        if (itemValue == "NULL") {
            Alert.alert("Must Choose a State");
        }
    }

    // generate a picker for ios instead of a React Picker
    generatePicker(opts) {
        ActionSheetIOS.showActionSheetWithOptions({
            options: opts
        },
        (buttonIndex) => {
            // switch based on which picker is invoked (indicated by the 'opts' passed as arguments)
            if (opts == states) {
                this.setState({operatingState: opts[buttonIndex]});
            } else if (opts == agencies) {
                this.setState({agencyDisplay: agencies[buttonIndex]});
                this.setState({agency: agenciesTags[buttonIndex]});
                this.setState({badgeID: "N/A"});
                this.setState({hempCultID: "N/A"});
                this.promptChecker(agenciesTags[buttonIndex]);
            } else {
                // opts didn't match any expected input.
                // somehow generatePicker was called from an unexpected location
                // TODO: error code subject to change once we decide on a scheme to name them
                Alert.alert("Something has gone wrong. Please retry registration. Error Code 1001");
            }
        });
    }
    
    handleNoDialog=()=> {
        this.props.navigation.navigate('LicenseApplication')
        this.setState({dialogVisable:false})



    }
  

    render(){
        return(
            <View style={Spacing.colorContainer}>
                {(Platform.OS === 'ios') ?
                    <TouchableOpacity style={Buttons.iosPickerButton} onPress={() => this.generatePicker(states)}>
                        <Text style={Typography.buttonText}>
                            {(this.state.operatingState == " ") ? "Select a State" : this.state.operatingState}
                        </Text>
                    </TouchableOpacity> :
                    <Picker style={UserInterface.inputBox}
                        mode="dropdown"
                        selectedValue={this.state.operatingState}
                        onValueChange={itemValue => this.onLocationChange(itemValue)}>
                        <Picker.Item label="Select a State" value="NULL"/>
                        <Picker.Item label="Alabama" value="Alabama" />
                        <Picker.Item label="Alaska" value="Alaska" />
                        <Picker.Item label="Arizona" value="Arizona" />
                        <Picker.Item label="Arkansas" value="Arkansas" />
                        <Picker.Item label="California" value="California" />
                        <Picker.Item label="Colorado" value="Colorado" />
                        <Picker.Item label="Connecticut" value="Connecticut" />
                        <Picker.Item label="Delaware" value="Delaware" />
                        <Picker.Item label="Florida" value="Florida" />
                        <Picker.Item label="Georgia" value="Georgia" />
                        <Picker.Item label="Hawaii" value="Hawaii" />
                        <Picker.Item label="Idaho" value="Idaho" />
                        <Picker.Item label="Illinois" value="Illinois" />
                        <Picker.Item label="Indiana" value="Indiana" />
                        <Picker.Item label="Iowa" value="Iowa" />
                        <Picker.Item label="Kansas" value="Kansas" />
                        <Picker.Item label="Kentucky" value="Kentucky" />
                        <Picker.Item label="Louisiana" value="Louisiana" />
                        <Picker.Item label="Maine" value="Maine" />
                        <Picker.Item label="Maryland" value="Maryland" />
                        <Picker.Item label="Massachusetts" value="Massachusetts" />
                        <Picker.Item label="Michigan" value="Michigan" />
                        <Picker.Item label="Minnesota" value="Minnesota" />
                        <Picker.Item label="Mississippi" value="Mississippi" />
                        <Picker.Item label="Missouri" value="Missouri" />
                        <Picker.Item label="Montana" value="Montana" />
                        <Picker.Item label="Nebraska" value="Nebraska" />
                        <Picker.Item label="Nevada" value="Nevada" />
                        <Picker.Item label="New Hampshire" value="New Hampshire" />
                        <Picker.Item label="New Jersey" value="New Jersey" />
                        <Picker.Item label="New Mexico" value="New Mexico" />
                        <Picker.Item label="New York" value="New York" />
                        <Picker.Item label="North Carolina" value="North Carolina" />
                        <Picker.Item label="North Dakota" value="North Dakota" />
                        <Picker.Item label="Ohio" value="Ohio" />
                        <Picker.Item label="Oklahoma" value="Oklahoma" />
                        <Picker.Item label="Oregon" value="Oregon" />
                        <Picker.Item label="Pennsylvania" value="Pennsylvania" />
                        <Picker.Item label="Rhode Island" value="Rhode Island" />
                        <Picker.Item label="South Carolina" value="South Carolina" />
                        <Picker.Item label="South Dakota" value="South Dakota" />
                        <Picker.Item label="Tennessee" value="Tennessee" />
                        <Picker.Item label="Texas" value="Texas" />
                        <Picker.Item label="Utah" value="Utah" />
                        <Picker.Item label="Vermont" value="Vermont" />
                        <Picker.Item label="Virginia" value="Virginia" />
                        <Picker.Item label="Washington" value="Washington" />
                        <Picker.Item label="West Virginia" value="West Virginia" />
                        <Picker.Item label="Wisconsin" value="Wisconsin" />
                        <Picker.Item label="Wyoming" value="Wyoming" />
                    </Picker>
                }
                {(Platform.OS === 'ios') ?
                    <TouchableOpacity style={Buttons.iosPickerButton} onPress={() => this.generatePicker(agencies)}>
                        <Text style={Typography.buttonText}>
                            {(this.state.agencyDisplay == " ") ? "Select an Agency" : this.state.agencyDisplay}
                        </Text>
                    </TouchableOpacity> :
                    <Picker
                        style={UserInterface.inputBox}
                        mode="dropdown"
                        selectedValue={this.state.agency}
                        onValueChange={(itemValue) => {this.onAgencyChange(itemValue); this.promptChecker(itemValue)}}>
                        <Picker.Item label="Choose an Agency" value="NULL"/>
                        <Picker.Item label="Government" value="Regulator" />
                        <Picker.Item label="Law Enforcement" value="Police/Highway" />
                        <Picker.Item label="Cultivator" value="Farmer" />
                        <Picker.Item label="Processor/Manufacturer" value="Factory" />
                        <Picker.Item label="Transporter" value="Trucker" />
                    </Picker>
                }                    

                    { (this.state.isDialogVisibleCult)?
                    <TextInput
                    style={UserInterface.inputBox}
                    placeholder="Hemp License #"
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.hempCultID = input}
                    onChangeText={(hempCultID) => this.setState({hempCultID})}
                    onSubmitEditing={() => this.firstName.focus()}
                   /> : null
                    }
                    
                    {(this.state.isDialogVisibleLaw)?
                    <TextInput editable={this.state.isDialogVisibleLaw}
                    style={UserInterface.inputBox}
                    placeholder="Badge #"
                    placeholderTextColor="#ffffff"
                    ref={(input) => this.badgeID = input}
                    onChangeText={(badgeID) => this.setState({badgeID})}
                    onSubmitEditing={() => this.firstName.focus()}
                   />  : null
                    } 

                <Dialog.Container visible={this.state.dialogVisable}>
                    <Dialog.Description>
                     Have you applied with the Wyoming Department of Agircultre for a hemp license?
                    </Dialog.Description>
                    <Dialog.Button label="Yes" onPress={() => this.setState({dialogVisable: false})}/>
                    <Dialog.Button label="No" onPress={() => this.handleNoDialog()}/>
                </Dialog.Container>     

                  <TextInput style={UserInterface.inputBox}
                   placeholder="City"
                   placeholderTextColor="#ffffff"
                   ref={(input) => this.city = input}
                   onChangeText={(city) => this.setState({city})}
                   onSubmitEditing={() => this.firstName.focus()}
                  />
                  <TextInput style={UserInterface.inputBox}
                   placeholder="Admin First Name"
                   placeholderTextColor="#ffffff"
                   ref={(input) => this.firstName = input}
                   onChangeText={(firstName) => this.setState({firstName})}
                   onSubmitEditing={() => this.lastName.focus()}
                  />
                  <TextInput style={UserInterface.inputBox}
                   placeholder="Admin Last Name"
                   placeholderTextColor="#ffffff"
                   ref={(input) => this.lastName = input}
                   onChangeText={(lastName) => this.setState({lastName})}
                   onSubmitEditing={() => this.adminEmail.focus()}
                  />
                  <TextInput style={UserInterface.inputBox}
                   placeholder="Admin Email"
                   selectionColor="#ffffff"
                   keyboardType= 'email-address'
                   placeholderTextColor="#ffffff"
                   ref={(input) => this.adminEmail = input}
                   onChangeText={(email) => this.setState({email})}
                   onSubmitEditing={() => this.password.focus()}
                  />
                  <TextInput style={UserInterface.inputBox}
                   placeholder="Admin Password"
                   secureTextEntry= {true}
                   placeholderTextColor="#ffffff"
                   onChangeText={(password) => this.setState({password})}
                   ref={(input) => this.password = input}
                  />
                  <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.goBack()}>
                    <Text style={Typography.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
                  <TouchableOpacity style={Spacing.buttonContainer} onPress={() => {this.signUpUser(this.state.email,this.state.password)}}>
                        <Text style={Typography.buttonText}>
                            Finish Registration
                        </Text>
                  </TouchableOpacity>
            </View>
        );
    }
}
