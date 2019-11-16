
import * as firebase from 'firebase';

import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

import Logo from '../../components/Logo';
import LoginForm from '../../components/LoginForm';

//See sign-up pg for notes
import { Actions } from 'react-native-router-flux';

export default class Dashboard extends Component{
    constructor(props){
        super(props)
    
        this.state= ({
          email: ''
        
      
      });
      } 

    onSignoutPress = () =>{
        firebase.auth().signOut().then(()=>{
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
            <TouchableOpacity style={styles.button} onPress={()=>this.onSignoutPress(this.state.email)}>
                  <Text style={styles.buttonText}>
                    Sign Out
                  </Text>

              </TouchableOpacity>
        </View>
      );
    }
    
    }


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
            },
            signupText:{
              color:'rgba(255, 255, 255, 0.6)',
              fontSize: 16
    
          },
    
    
          });
      