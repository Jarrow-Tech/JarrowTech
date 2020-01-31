//Display page for users who are 'Processors/ Manufactuers'
import * as firebase from 'firebase';

import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import Prompt from 'react-native-input-prompt';
import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';

//See sign-up pg for notes
import { Actions } from 'react-native-router-flux';
import { user } from '../../../App';

export default class ManufProcs extends Component {
  constructor(props) {
    super(props)
    this.state= ({
      email: '',
      isOpen: false,
  });}

  onSignoutPress = () => {
    firebase.auth().signOut().then(() => {
      Alert.alert("Successfully signed out")
    }, (error) => {
      Alert.alert(error.message);
    });
      this.login
  }


  login(){
    Actions.login();
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.buttonText}>
          Process/Manufacturer Page
        </Text>

          <TouchableOpacity style={styles.button} onPress={() => this.onSignoutPress(this.state.email)}>
            <Text style={styles.buttonText}>
              Sign Out
            </Text>

          </TouchableOpacity>
      </View>
    );
  }
}


const styles= StyleSheet.create({
  container: {
    flexGrow:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#455a64',
  },
  inputBox: {
      width:300,
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#ffffff',
      marginVertical: 10,
  },
  button: {
      width:300,
      backgroundColor:'#1c313a',
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
  signupText: {
    color:'rgba(255, 255, 255, 0.6)',
    fontSize: 16
  },
});
