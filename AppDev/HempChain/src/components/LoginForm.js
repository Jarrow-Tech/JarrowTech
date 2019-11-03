//This is the login form page
//This is the pg that formats what the login pg will look like
import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class LoginForm extends Component{

//keyboardtype allows us to specify what type to use
//onSubmitEditing takes us straight to the passeword textinput after entering email
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
             onSubmitEditing={()=>this.password.focus()}
              />
              <TextInput style={styles.inputBox}
             placeholder="Password"
             secureTextEntry= {true}
             placeholderTextColor="#ffffff"
             ref={(input)=>this.password=input}
              />
              <TouchableOpacity style={styles.button}>
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