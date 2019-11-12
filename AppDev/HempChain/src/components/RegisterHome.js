import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

export default class RegisterForm extends Component{

directToTransfer(){
  Actions.transfer();
}

buisRegistration()
{
    Actions.buisRegistration();
}

emplyRegistration()
{
    Actions.login();

}



//keyboardtype allows us to specify what type to use
//onSubmitEditing takes us straight to the passeword textinput after entering email
//securetextentry dots out the input text
// {this.props.type} turns the LOGIN and SIGN-UP on the bottom of the screens into props
// allowing them to be more easily accesed in the routes folder.
    render(){
      return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonRegister} onPress={this.directToTransfer}>
                <Text style={styles.buttonText}>
                Register as a Buisness/Department   
                </Text>                 

            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRegister}>
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
        container:{
          flexGrow:1,
          alignItems:'center',
          justifyContent:'center'
        },
        buttonRegister:{
            width:300,
            backgroundColor:'rgba(255,255,255,0.3)',
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
        buttonCont:
        {
            width:300,
            backgroundColor:'#1c313a',
            borderRadius: 25,
            marginVertical: 10,
            paddingVertical: 12,
            alignContent: 'center',

        },


      });