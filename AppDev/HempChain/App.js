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
import Cultivator from './src/pages/Displays/Cultivator';
import Login from './src/pages/Authentication/Login';

//11-4-19, dont forget to add <Routes/> back to where is was
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      isAuthenticationReady: false,
      isAuthenticated: false,
      agency: 'none'
    };

    firebase.auth().onAuthStateChanged(this.onAuthStateChanged)
  }

  // triggers whenever the authentication state for the database changes
  onAuthStateChanged = (user) => {

    // true if a valid user object has been gathered from firebase
    if (user) {
      this.setState({isAuthenticationReady: true});
      if (typeof user.emailVerified !== 'undefined') {
        this.setState({isAuthenticated: user.emailVerified});

        firebase.database().ref("Users/" + user.uid + "/agency").on('value', snapshot => {
          let data = snapshot.val();
          this.setState({agency: data});
        })

      } else {
        this.setState({isAuthenticated: false});
      }
    } else {
      this.setState({isAuthenticationReady: false});
      this.setState({isAuthenticated: false});
    }
  }

  // if a user is logged in and has verified their email, this will re-direct them based on their organization
  // and their privelege level. if they haven't authenticated, then they will be directed to the login page/other router
  // pages accessible without logging in
  render() {
    //Switch based on agency
    if (this.state.isAuthenticated){
      switch(this.state.agency){
        case 'Police/Highway': return(
                                <View style= {styles.container}>
                                  <StatusBar
                                    backgroundColor= "#1c313a"
                                    barStyle="light-content"/>
                                    <LawEnforcement/>
                                </View>
                              );

        case 'Farmer': return(
                                <View style= {styles.container}>
                                  <StatusBar
                                    backgroundColor= "#1c313a"
                                    barStyle="light-content"/>
                                    <Cultivator/>
                                </View>
                              );

        // once all other agency pages are exposed/finished they get a case statement based on what thier
        // agency is within the firebase database. those cases go here.

        // default case that falls back on routes
        // QUESTION: should this point to some sort of help page? users will be authenticated at this point, just with
        // an unexpected agency
        default: return(
                  <View style= {styles.container}>
                    <StatusBar
                      backgroundColor= "#1c313a"
                      barStyle="light-content"/>
                      <Routes/>
                  </View>
                );
      }

    // case where use is un-authenticated/un-verified
    } else {
      return(
        <View style= {styles.container}>
          <StatusBar
            backgroundColor= "#1c313a"
            barStyle="light-content"/>
            <Routes/>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#455a64',
    flex:1,
    justifyContent:'center'
  }
});
