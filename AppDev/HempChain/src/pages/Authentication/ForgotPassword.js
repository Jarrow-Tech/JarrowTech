//Firebase is the database that will have our user accounts on it
import * as firebase from 'firebase';

//Initialize Firebase
//DONT PUT THIS INITILIZATION ANY WHERE ELSE
//IT WILL MESS THINGS UP
//PUT THIS IN THE APP.JS FILE WHEN FINSHED MESSING AROUND
/*const firebaseConfig={
  apiKey: "AIzaSyCW8jXAWYtTZetKkMo8w7XEZGMlXyQkh-g",
    authDomain: "jarrowchain.firebaseapp.com",
    databaseURL: "https://jarrowchain.firebaseio.com",
    projectId: "jarrowchain",
    storageBucket: "jarrowchain.appspot.com",
};
firebase.initializeApp(firebaseConfig); */


import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

//Setting the this.state in a constructor allows us to call and manipulate it easier
export default class ForgotPassword extends Component{
  constructor(props){
    super(props)

    this.state= ({
      email: ''
    
  
  });
  } 

  onResetPasswordPress=()=>{
    firebase.auth().sendPasswordResetEmail(this.state.email)
    .then(()=>{
      Alert.alert("Password reset link has been sent to email.");

    }, (error)=>{
      Alert.alert(eror.message);

    });
  }
    render(){
      return(
        <View style={styles.container}>
            <TextInput style={styles.inputBox}
             placeholder="Email"
             placeholderTextColor="#ffffff"
             selectionColor="#ffffff"
             keyboardType= "email-address"
             value={this.state.email}
             onChangeText={(text)=> this.setState({email: text})}
             onSubmitEditing={()=>this.password.focus()}
              />
              <TouchableOpacity style={styles.button} onPress={this.onResetPasswordPress}>
                  <Text style={styles.buttonText}>
                    Send Reset Link
                  </Text>

              </TouchableOpacity>
              
        </View>
      );
    }
    
    }


    //stylesheet helps us in formating the display and objects
    const styles= StyleSheet.create({
        container:{
          backgroundColor:'#455a64',
          flexGrow:1,
          alignItems:'center',
          justifyContent:'center'
        },
        inputBox:{
            width:300,
            backgroundColor:'rgba(255,255,255,0.3)',
            borderRadius: 25,
            paddingHorizontal: 16,
            fontSize: 16,
            color: '#ffffff',
            marginVertical: 10,
        },
        button:{
            width:300,
            backgroundColor:'#1c313a',
            borderRadius: 25,
            marginVertical: 10,
            paddingVertical: 12,
            alignContent: 'center',
        },
        
        buttonText:{
            fontSize: 16,
            fontWeight: '500',
            color: '#ffffff', 
            textAlign: 'center'          
        },
        signupText:{
          color:'rgba(255, 255, 255, 0.6)',
          fontSize: 16

      },


      });