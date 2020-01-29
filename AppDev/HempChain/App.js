// All current code was written by Carlton O. Wilcox
//Carlton O. Wilcox made all of the current comments on 1/29/20
 

//This is the main file in which the app will run everything
//Greyed out text means that its not in use/declared
import * as firebase from 'firebase';

//Here is our Firebase initilization
//NOTHING HERE HAS TO CHANGE JUST YET S
const firebaseConfig={
  apiKey: "AIzaSyCW8jXAWYtTZetKkMo8w7XEZGMlXyQkh-g",
    authDomain: "jarrowchain.firebaseapp.com",
    databaseURL: "https://jarrowchain.firebaseio.com",
    projectId: "jarrowchain",
    storageBucket: "jarrowchain.appspot.com",
};
//The below initilizes firebase and sets variables for the refrencing to the database 
firebase.initializeApp(firebaseConfig);
const rootRef=firebase.database().ref();
export const userRef= rootRef.child("Users/");
export var user= firebase.auth().currentUser;


import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
//provides app with data
import {Provider} from 'react-redux';
import {store} from './src/redux/Appredux';


//import Login from './src/pages/Login';
//import SignUp from './src/pages/Sign-Up';
//import CultivatorReg from './src/pages/CultivatorReg'
//import TransferPage from './src/pages/TransferPage'
import TestScreen from './src/pages/TestScreen'



//Routes allows us to navigate to different pages much easier than using the standard react-navigation tools
// react-navigation tools are built into the react-native-router-flux github that is downloaded
import Routes from './src/Routes';
import Dashboard from './src/pages/Displays/FinishedReg';
import { Actions } from 'react-native-router-flux';
import LawEnforcement from './src/pages/Displays/LawEnforce';
import Login from './src/pages/Authentication/Login';



//11-4-19, dont forget to add <Routes/> back to where is was
export default class App extends Component{
  
constructor(props){
  super(props);
  this.state={
    isLoadingComplete: false,
    isAuthenticationReady: false,
    isAuthenticated: false
  };

 
  
  firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
  
  
}

onAuthStateChanged=(user)=>{ 
 this.setState({isAuthenticationReady: true});
  this.setState({isAuthenticated: !!user});
  
  
  
}






//Things are a little weird right now with the direction/navigation of everything in the app
//The below is an 'in-line' if statement that checks if the user has created an account and if their email is verified
// then it will log them into the law enforecemnet [age which we will need to change to the specific agencey page
render(){
  return(
    <View style= {styles.container}>
      <StatusBar
        backgroundColor= "#1c313a"
        barStyle="light-content"/>        
        {(this.state.isAuthenticated && firebase.auth().currentUser.emailVerified == true) ? <LawEnforcement/> : <Routes/>}
        
  
       
    </View>
   
  
  );
}

}

const styles= StyleSheet.create({
  container:{
    backgroundColor:'#455a64',
    flex:1,
    justifyContent:'center'    
  }
});




