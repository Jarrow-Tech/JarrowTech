//This is the page that will direct them to sign-up/ create an account as either a buisness or an employee
//pressing on either of the buttons will direct the user to the specific pages.
//Currently the "Register as Employee" button dosent direct anywhere at the moment. 11/11/19
import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class RegisterForm extends Component {
  //Routes the user to the buisness reg. page
  buisRegistration() {
      Actions.buisRegistration();
  }

  //Routes the user to the employee reg. page
  emplyRegistration() {
      Actions.employee();
  }

  //Pressing te buttons will route the users to the specified pages
  render() {
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.buttonRegister} onPress={this.buisRegistration}>
          <Text style={styles.buttonText}>
            Register as a Buisness/Department
          </Text>

        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister} onPress={this.emplyRegistration}>
          <Text style={styles.buttonText}>
            Register as an Employee
          </Text>

        </TouchableOpacity>
      </View>
    );
  }
}


//stylesheet helps us in formating the display and objects
const styles= StyleSheet.create({
  container: {
    flexGrow:1,
    alignItems:'center',
    justifyContent:'center'
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
