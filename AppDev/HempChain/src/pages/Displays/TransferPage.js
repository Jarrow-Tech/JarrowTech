//This page contains the picker that once selected will direct the user to the
//corresponding page after they select a state.

//THIS PAGE IS OBSOLETE AND IS ONLY HERE JUST AS A TESTING PAGE 1/29/20

import * as firebase from 'firebase';

import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { userRef } from '../../../App';


export default class TransferPage extends Component {

  onSelectionPressLocation(itemValue) {
    this.setState({location: itemValue});
    userRef.push({ OperatingState : itemValue});
  }

  constructor(props){
    super(props);
    this.users={agency: ''};
    this.state={location: ' '};
  }

  //When state is changed this function is called and the user is automatically directed to the selected Agency page
  onValueChange(itemValue) {
    this.setState({agency: itemValue});

    if(itemValue == 'Regulator') {
      Actions.buisRegistration();
      userRef.push({ Agency : itemValue});
    }

    if(itemValue == 'Farmer') {
        Actions.cultivate();
        userRef.push({ Agency : itemValue});
    }

    if(itemValue == 'Factory') {
        Actions.factory();
        userRef.push({ Agency : itemValue});
    }

    if(itemValue == 'Trucker') {
        Actions.employee();
        userRef.push({ Agency : itemValue});
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.buttonText}>
          Select State:
        </Text>

        <Picker style={styles.buttonRegister}
          mode="dropdown"
          selectedValue={this.state.location}
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
        <Text style={styles.buttonText}>
          Select an Agency:
        </Text>
        <Picker
        style={styles.buttonRegister}
        mode="dropdown"
        selectedValue={this.users.agency}
        onValueChange={(itemValue => this.onValueChange(itemValue))}>
          <Picker.Item label="Choose an Agency" value="choose"/>
          <Picker.Item label="Government" value="Regulator" />
          <Picker.Item label="Cultivator" value="Farmer" />
          <Picker.Item label="Processor/Manufacturer" value="Factory" />
          <Picker.Item label="Transporter" value="Trucker" />

        </Picker>
      </View>
    );
  }
}


//stylesheet helps us in formating the display and objects
const styles= StyleSheet.create({
  container: {
    flexGrow:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#455a64'

  },
  buttonRegister: {
      width:300,
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
      alignContent: 'center',
  },
  buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  },
  buttonCont: {
      width:300,
      backgroundColor:'#1c313a',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
      alignContent: 'center',
  },
});
