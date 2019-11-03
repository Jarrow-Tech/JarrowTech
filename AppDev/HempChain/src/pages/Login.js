//The pages folder will contain the pages the user will see
//This is the login page

//This imports our tools that we need from React
import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

//imports the logo.js components
import Logo from '../components/Logo';
//imports the LoginForm.js components
import LoginForm from '../components/LoginForm';

//See sign-up pg for notes
import { Actions } from 'react-native-router-flux';



export default class Login extends Component{

    //this takes us to the signup pg when the action is called
    signup(){
        Actions.signup()

    }



    render(){
      return(
        <View style={styles.container}>
            <Logo/>
            <LoginForm type="Login"/>
            <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>
                    Dont have an Account? </Text>
                    <TouchableOpacity onPress={this.signup}>
                    <Text style={styles.signupButton}>
                 Register Here!</Text>

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
      
      