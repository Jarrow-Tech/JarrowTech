// All current code was written by Carlton O. Wilcox
//Carlton O. Wilcox made all of the current comments on 1/29/20
import 'react-native-gesture-handler';

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
const rootRef = firebase.database().ref();
export const userRef = rootRef.child("Users/");
export var user = firebase.auth().currentUser;

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  YellowBox,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/RootNavigation';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//provides app with data
import { Provider } from 'react-redux';
import { store } from './src/redux/Appredux';

//import Login from './src/pages/Login';
//import SignUp from './src/pages/Sign-Up';
//import CultivatorReg from './src/pages/CultivatorReg'
//import TransferPage from './src/pages/TransferPage'
import TestScreen from './src/pages/TestScreen'

//Routes allows us to navigate to different pages much easier than using the standard react-navigation tools
// react-navigation tools are built into the react-native-router-flux github that is downloaded
import Dashboard from './src/pages/Displays/FinishedReg';
import LawEnforcement from './src/pages/Displays/LawEnforce';
import Cultivator from './src/pages/Displays/Cultivator';
import ManufacturingProcess from './src/pages/Displays/ProcessManuf';
import Login from './src/pages/Authentication/Login';
import Signup from './src/pages/Authentication/Sign-Up';
import ForgotPassword from './src/pages/Authentication/ForgotPassword';
import BusinessRegistration from './src/pages/Registration/BuisRegistration';
import EmployeeRegistration from './src/pages/Registration/Employee';
import HarvestInformation from './src/pages/Displays/CultivatorHelpers/HarvestInformation';
import Selling from './src/pages/Displays/CultivatorHelpers/Selling';
import Buying from './src/pages/Displays/CultivatorHelpers/Buying';
import Regulator from './src/pages/Displays/RegulatorGov';
import SearchTransaction from './src/pages/Displays/RegulatorHelpers/TransactionSearch';
import Hempmap from './src/pages/Displays/RegulatorHelpers/RegulatorMap'
import Transporter from './src/pages/Displays/Transporter';
import CheckDestination from './src/pages/Displays/TransporterHelpers/CheckDestination';
import QRGenerator from './src/pages/Displays/TransporterHelpers/GenerateQRCode';
import LogTransaction from './src/pages/Displays/ProcessManufHelpers/LogTransactions';
import Lab from './src/pages/Displays/Lab';
import LogReport from './src/pages/Displays/LabPageHelpers/LogReport';
import CultTransaction from './src/pages/Displays/CultivatorHelpers/Transaction';



// this line supresses the firebase timer warning.
// it is addressed at https://github.com/facebook/react-native/issues/12981
// do not add any other warnings to this space.
YellowBox.ignoreWarnings([ 'Setting a timer' ]);

export default class App extends Component {

    constructor(props) {
        super(props);
        try {
            React.localStorage.removeItem('firebase:previous_websocket_failure');
        } catch (err) {}
        this.state = {
            isLoadingComplete: false,
            isAuthenticationReady: false,
            isAuthenticated: true,
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
        return(
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator headerMode="none">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignUp" component={Signup} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    <Stack.Screen name="BusinessRegistration" component={BusinessRegistration} />
                    <Stack.Screen name="EmployeeRegistration" component={EmployeeRegistration} />
                    <Stack.Screen name="Regulator" component={Regulator} />
                    <Stack.Screen name="LawEnforcement" component={LawEnforcement} />
                    <Stack.Screen name="Cultivator" component={Cultivator} />
                    <Stack.Screen name="HarvestInformation" component={HarvestInformation} />
                    <Stack.Screen name="Selling" component={Selling} />
                    <Stack.Screen name="Buying" component={Buying} />
                    <Stack.Screen name="SearchTransaction" component={SearchTransaction} />
                    <Stack.Screen name="LogTransaction" component={LogTransaction} />
                    <Stack.Screen name="Hempmap" component={Hempmap} />
                    <Stack.Screen name="ManufacturingProcess" component={ManufacturingProcess} />
                    <Stack.Screen name="Transporter" component={Transporter} />
                    <Stack.Screen name="CheckDestination" component={CheckDestination} />
                    <Stack.Screen name="QRGenerator" component={QRGenerator} />
                    <Stack.Screen name="Lab" component={Lab} />
                    <Stack.Screen name="LogReport" component={LogReport} />
                    <Stack.Screen name="CultTransaction" component={CultTransaction} />






                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
