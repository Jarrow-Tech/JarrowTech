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
} from 'react-native';
import Prompt from 'react-native-input-prompt'
import { userRef } from '../../../App';

import { Typography, Spacing, UserInterface, Buttons } from '../../styles/index';

export default class buisRegistration extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            email: " ",
            password: " ",
            firstName: " ",
            lastName: " ",
            operatingState: " ",
            agency:" ",
            city: " ",
            badgeID: " ",
            hempCultID: " ",
            isDialogVisibleLaw: false,
            isDialogVisibleCult: false,
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
    promptChecker=(itemValue) => {
        this.setState({agency: itemValue});
        if (itemValue == "Police/Highway") {
            this.setState({isDialogVisibleLaw: true})
        }
        if (itemValue == "Farmer") {
            this.setState({isDialogVisibleCult: true})
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

    render(){
        return(
            <View style={Spacing.colorContainer}>
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
                    <Picker.Item label="Lab" value="LabTester" />

                </Picker>
                <Prompt
                    visible={this.state.isDialogVisibleLaw}
                    title="Please Enter Badge Number"
                    placeholder="Badge Number"
                    onCancel={() => this.setState({
                            isDialogVisibleLaw: !this.state.isDialogVisibleLaw
                        })
                    }
                    onSubmit={text => this.setState({
                            text: "Badge Number submitted",
                            isDialogVisibleLaw: !this.state.isDialogVisibleLaw,
                            badgeID: text,
                        })
                    }/>
                <Prompt
                    visible={this.state.isDialogVisibleCult}
                    title="Please Enter Hemp Cultivator ID"
                    placeholder="ID"
                    onCancel={() => this.setState({
                            isDialogVisibleCult: !this.state.isDialogVisibleCult
                        })
                    }
                    onSubmit={text => this.setState({
                            text: "Hemp ID Submitted",
                            isDialogVisibleCult: !this.state.isDialogVisibleCult,
                            hempCultID: text,
                        })
                    }/>
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
                  <TouchableOpacity style={Spacing.buttonContainer} onPress={() => {this.signUpUser(this.state.email,this.state.password)}}>
                        <Text style={Typography.buttonText}>
                            Finish Registration
                        </Text>
                  </TouchableOpacity>
            </View>
        );
    }
}
