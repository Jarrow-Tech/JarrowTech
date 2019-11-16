//This is the sign-up page
//This page is currently using the loginform's layout but will be changed 11/2/19 Carlton O. Wilcox

//This imports our tools that we need from React
//TouchableOpacity allows use to make the specified something we can click and interact with
import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

//imports the logo.js components
import Logo from '../../components/Logo';
//imports the LoginForm.js components
import LoginForm from '../../components/LoginForm';
//import the register form and what it will look like
import RegisterForm from '../../components/RegisterHome';

//Imports the Actions tool from router-flux to allow us to traverse pages
// For more on actions see the Routes file with the link to the GitHub w/
// documentation
import { Actions } from 'react-native-router-flux';



export default class SignUp extends Component{

    // takes us to the previous screen
    goback(){
        Actions.login();
    }

    //Registerform is where the buttons that the user presses are located
    render(){
      return(
        <View style={styles.container}>
            <Logo/>
            <RegisterForm type="Register"/>
            <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>
                    Already Registered? </Text>
                    <TouchableOpacity onPress={this.goback}>
                <Text style={styles.signupButton}> Log in Now!</Text>
                </TouchableOpacity>


                
            </View>   
        </View>
      );
    }
    
    }


    const styles= StyleSheet.create({
        container:{
          backgroundColor:'#455a64',
          flexGrow:1,
          alignItems:'center',
          justifyContent:'center'    
        },
        signupTextCont:{
          flexGrow:1,
          alignItems:'flex-end',
          justifyContent:'center',
          paddingVertical: 16,
          flexDirection: 'row',
        },
        signupText:{
            color:'rgba(255, 255, 255, 0.6)',
            fontSize: 16

        },
        signupButton:{
            color:'#ffffff',
            fontSize: 16,
            fontWeight:'500'
        },
      });