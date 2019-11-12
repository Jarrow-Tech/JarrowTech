//This is where users who choose a secific agency will register their buisness/affiliation
import * as firebase from 'firebase';

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

export default class buisRegistration extends Component{
  constructor(props){
    super(props)

    this.state= ({
      email: '',
      password: ''
  
  });
  } 
  //takes to the user to a filler "finished" page for the moment
  finishReg(){
    Actions.finish();
  }
  //Adds the user to the firebase db
  signUpUser=(email,password) =>{
    try{

      if(this.state.password.length<8)
      {
        alert("Please enter at least 8 characters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email,password)
      this.finishReg;


    }
    catch(error){
      console.log(error.toString())

    }
  }

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
         placeholder="Admin First Name"
         placeholderTextColor="#ffffff"
         ref={(input)=>this.firstName=input}
         onSubmitEditing={()=>this.lastName.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Admin Last Name"
         placeholderTextColor="#ffffff"
         ref={(input)=>this.lastName=input}
         onSubmitEditing={()=>this.adminEmail.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Admin Email"
         selectionColor="#ffffff"
         keyboardType= 'email-address'
         placeholderTextColor="#ffffff"
         ref={(input)=>this.adminEmail=input}
         onChangeText={(email)=> this.setState({email})}
         onSubmitEditing={()=>this.password.focus()}
          />
          <TextInput style={styles.inputBox}
         placeholder="Admin Password"
         secureTextEntry= {true}
         placeholderTextColor="#ffffff"
         onChangeText={(password)=> this.setState({password})}
         ref={(input)=>this.password=input}
          />

            <TouchableOpacity style={styles.buttonCont} onPress={()=>this.signUpUser(this.state.email,this.state.password)}>
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