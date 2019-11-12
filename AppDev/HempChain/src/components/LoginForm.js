//This is the login form page
//This is the pg that formats what the login pg will look like

//Firebase is the database that will have our user accounts on it
import * as firebase from 'firebase';

//Initialize Firebase
//DONT PUT THIS INITILIZATION ANY WHERE ELSE
//IT WILL MESS THINGS UP
const firebaseConfig={
  apiKey: "AIzaSyCW8jXAWYtTZetKkMo8w7XEZGMlXyQkh-g",
    authDomain: "jarrowchain.firebaseapp.com",
    databaseURL: "https://jarrowchain.firebaseio.com",
    projectId: "jarrowchain",
    storageBucket: "jarrowchain.appspot.com",
};
firebase.initializeApp(firebaseConfig); 


import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

//Setting the this.state in a constructor allows us to call and manipulate it easier
export default class LoginForm extends Component{
  constructor(props){
    super(props)

    this.state= ({
      email: '',
      password: ''
  
  });
  } 
  //This is the funciton to sign a user in if they have an account created else it...
  loginUser=(email,password) =>{
    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function(user){
        console.log(user)
      })

      Actions.cultivate()

    }
    catch(error){
      console.log(error.toString())

    }
    
  }
//keyboardtype allows us to specify what type to use
//onSubmitEditing takes us straight to the password textinput after entering email
//securetextentry dots out the input text
// {this.props.type} turns the LOGIN and SIGN-UP on the bottom of the screens into props
// allowing them to be more easily accesed in the routes folder.
    render(){
      return(
        <View style={styles.container}>
            <TextInput style={styles.inputBox}
             placeholder="Email"
             placeholderTextColor="#ffffff"
             selectionColor="#ffffff"
             keyboardType= "email-address"
             onChangeText={(email)=> this.setState({email})}
             onSubmitEditing={()=>this.password.focus()}
              />
              <TextInput style={styles.inputBox}
             placeholder="Password"
             secureTextEntry= {true}
             placeholderTextColor="#ffffff"
             onChangeText={(password)=> this.setState({password})}
             ref={(input)=>this.password=input}
              />
              <TouchableOpacity style={styles.button} onPress={()=>this.loginUser(this.state.email,this.state.password)}>
                  <Text style={styles.buttonText}>
                    {this.props.type}
                  </Text>

              </TouchableOpacity>
        </View>
      );
    }
    
    }


    //stylesheet helps us in formating the display and objects
    const styles= StyleSheet.create({
        container:{
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
        }


      });