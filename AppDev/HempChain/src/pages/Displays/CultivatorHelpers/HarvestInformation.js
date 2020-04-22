//This will be the display page for a user whos' agencey type is Cultivator
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Picker,
  Alert,
  ScrollView,
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
            registrantName: '',
            businessName: '',
            registrationNumber: 0,
            mailingAddress: '',
            registrantCity: '',
            registrantState: '',
            registrantZip: 0,
            primaryContact: '',
            phoneNumber: 0,
            registrantEmail: '',
            harvestStart: '',
            harvestEnd: '',
            harvestCounty: '',
            harvestAddress: '',
            harvestCity: '',
            harvestZip: 0,
            harvestLat: 0.0,
            harvestLong: 0.0, 
            cropSize: 0,
            cropType: '',
        });
        this.harvest = this.harvest.bind(this);
    }

    //Makes it to where they cannot choose a null State
    onLocationChange(itemValue) {
        this.setState({operatingState: itemValue});
        if (itemValue == "NULL") {
            Alert.alert("Must Choose a State");
        }
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
                    <Text style={Typography.logoText}>
                        Registrant Information
                    </Text>
                <ScrollView style={UserInterface.scrollBox}>
                    <View style={UserInterface.inputBox}>
                        <TextInput style={UserInterface.inputText}
                        placeholder="Registrant Name"
                        placeholderTextColor="#ffffff"
                        selectionColor="#ffffff"
                        value={this.state.cropSize}
                        onChangeText={(text) => this.setState({registrantName: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        />
                    </View>
                    <View style={UserInterface.inputBox}>
                        <TextInput style={UserInterface.inputText}
                        placeholder="Business Name"
                        placeholderTextColor="#ffffff"
                        selectionColor="#ffffff"
                        value={this.state.cropSize}
                        onChangeText={(text) => this.setState({businessName: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        />
                    </View>
                    <View style={UserInterface.inputBox}>
                        <TextInput style={UserInterface.inputText}
                        placeholder="Mailing Address"
                        placeholderTextColor="#ffffff"
                        selectionColor="#ffffff"
                        value={this.state.cropSize}
                        onChangeText={(text) => this.setState({mailingAddress: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        />
                    </View>
                    <View style={UserInterface.inputBox}>
                        <TextInput style={UserInterface.inputText}
                        placeholder="City"
                        placeholderTextColor="#ffffff"
                        selectionColor="#ffffff"
                        value={this.state.cropSize}
                        onChangeText={(text) => this.setState({registrantCity: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        />
                    </View>
                    {(Platform.OS === 'ios') ?
                    <TouchableOpacity style={Buttons.iosPickerButton} onPress={() => this.generatePicker(states)}>
                        <Text style={Typography.buttonText}>
                            {(this.state.operatingState == " ") ? "Select a State" : this.state.operatingState}
                        </Text>
                    </TouchableOpacity> :
                    <Picker style={UserInterface.inputBox}
                        mode="dropdown"
                        selectedValue={this.state.registrantState}
                        onValueChange={itemValue => this.onLocationChange(itemValue)}>
                        <Picker.Item label="State" value="NULL"/>
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
                    <View style={UserInterface.inputBox}>
                        <TextInput style={UserInterface.inputText}
                        placeholder="Zip Code"
                        placeholderTextColor="#ffffff"
                        selectionColor="#ffffff"
                        value={this.state.cropSize}
                        onChangeText={(text) => this.setState({registrantCity: registrantZip})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        />
                    </View>
                    <View style={UserInterface.inputBox}>
                        <TextInput style={UserInterface.inputText}
                        placeholder="Primary Contact Name"
                        placeholderTextColor="#ffffff"
                        selectionColor="#ffffff"
                        value={this.state.cropSize}
                        onChangeText={(text) => this.setState({registrantCity: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        />
                    </View>
                    <View style={UserInterface.inputBox}>
                        <TextInput style={UserInterface.inputText}
                        placeholder="Phone Number"
                        placeholderTextColor="#ffffff"
                        selectionColor="#ffffff"
                        value={this.state.cropSize}
                        onChangeText={(text) => this.setState({registrantCity: text})}
                        autoCapitalize="none"
                        autoCorrect={false}
                        />
                    </View>
                </ScrollView>
                <View style={Spacing.colorContainer}>
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
            </View>
        );
    }
}
