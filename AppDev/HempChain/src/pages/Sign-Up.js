//This is the sign-up page

//This imports our tools that we need from React
import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

//imports the logo.js components
import Logo from '../components/Logo';
//imports the LoginForm.js components
import LoginForm from '../components/LoginForm';


export default class SignUp extends Component{
    render(){
      return(
        <View style={styles.container}>
            <Logo/>
            <LoginForm type="SignUp"/>
            <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>
                    Already Registered? </Text>
                <Text style={styles.signupButton}> LOGIN</Text>


                
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