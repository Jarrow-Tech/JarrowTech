//This is the login form page
//This is the pg that formats what the login pg will look like

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
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { user } from '../../App';
 
//Setting the this.state in a constructor allows us to call and manipulate it easier
export default class LoginForm extends Component{
   
  
  constructor(props){
    super(props)

    this.state= ({
      email: '',
      password: ''
  
  });
 
  } 

  beforeVerificationDisplay()
  {
    Actions.dashboard();

  }

  afterVerificationDisplay(){

    Actions.lawEnforcement();
  }
  

  //This is the funciton to sign a user in if they have an account created else it...
  loginUser=(email,password) =>{ 
    

   
  
    /*
    1/4/2020 TRYING TO WORK ON SIGINNG IN USER AFTER THEY CLICK THE LINK
    var credential= firebase.auth.EmailAuthProvider.credentialWithLink(email,window.location.href)

    firebase.auth().currentUser.linkWithCredential(credential).then(()=>{

    }).catch((error)=>{
      Alert.alert(error.message);

    });
    
    ogin = (email, password) => {
    try {
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(res => {
             console.log(res.user.email);
      });} catch (error) {
      console.log(error.toString(error));
    }
  };
    
if (emailVerified == true)
{
  (signin user)
}
else
{
  Alert.alert("Please Verify Email")
}



    
    */



      firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
        if(firebase.auth().currentUser.emailVerified == false)
        {
          Alert.alert("Please Verify Email Address");
         

        }
        else if(firebase.auth().currentUser.emailVerified == true){
          firebase.database().ref("Users/" + "Agencey").once('value')
        
        

        }
         

        
        

      }, (error) => {
        Alert.alert(error.message);
        
      });
     
  }

forgotPassword()
{
  Actions.forgotPass();
}

dashBoard(){
  Actions.dashboard();
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
             value={this.state.email}
             onChangeText={(text)=> this.setState({email: text})}
             onSubmitEditing={()=>this.password.focus()}
             autoCapitalize="none"
             autoCorrect={false}
              />
              <TextInput style={styles.inputBox}
             placeholder="Password"
             secureTextEntry= {true}
             placeholderTextColor="#ffffff"
             value={this.state.password}
             onChangeText={(text)=> this.setState({password: text})}
             ref={(input)=>this.password=input}
             autoCorrect={false}
              />
              <TouchableOpacity style={styles.button} onPress={()=>this.loginUser(this.state.email,this.state.password)}>
                  <Text style={styles.buttonText}>
                    Login
                  </Text>

              </TouchableOpacity>
              <TouchableOpacity style={styles.signupText} onPress={this.forgotPassword}>
                <Text style={styles.buttonText}>
                  Forgot Password?
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
          backgroundColor:'#455a64',
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