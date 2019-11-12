//this page needs work not done yet

import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Logo from '../components/Logo';

export default class EmployeeReg extends Component{
  finishReg(){
    Actions.finish();
  }

//selecting company type will be a drop down box
    render(){
     
      return(
          
        <View style={styles.container}>          

          <TextInput style={styles.inputBox}
         placeholder="Enter Operating State"
         placeholderTextColor="#ffffff"
         ref={(input)=>this.opState=input}
         onSubmitEditing={()=>this.firstName.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Enter Company Name"
         placeholderTextColor="#ffffff"
         ref={(input)=>this.firstName=input}
         onSubmitEditing={()=>this.lastName.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Employee First Name"
         placeholderTextColor="#ffffff"
         ref={(input)=>this.lastName=input}
         onSubmitEditing={()=>this.adminEmail.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Employee Last Name"
         placeholderTextColor="#ffffff"
         ref={(input)=>this.lastName=input}
         onSubmitEditing={()=>this.adminEmail.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Employee Email"
         selectionColor="#ffffff"
         keyboardType= 'email-address'
         placeholderTextColor="#ffffff"
         ref={(input)=>this.adminEmail=input}
         onSubmitEditing={()=>this.password.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Employee Password"
         secureTextEntry= {true}
         placeholderTextColor="#ffffff"
         ref={(input)=>this.password=input}
          />
         <TouchableOpacity style={styles.buttonCont} onPress={this.finishReg}>
                  <Text style={styles.buttonText}>
                    Finish Registration
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
      justifyContent:'center',
      backgroundColor:'#455a64'
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