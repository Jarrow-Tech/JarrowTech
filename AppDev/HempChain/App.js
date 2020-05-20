// All current code was written by Carlton O. Wilcox
//Carlton O. Wilcox made all of the current comments on 1/29/20
import 'react-native-gesture-handler';
import './global';

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
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

//provides app with data
import { Provider } from 'react-redux';

//Routes allows us to navigate to different pages much easier than using the standard react-navigation tools
// react-navigation tools are built into the react-native-router-flux github that is downloaded
import Dashboard from './src/pages/Authentication/FinishedRegistration';
import LawEnforcement from './src/pages/LawEnforcement/LawEnforcement';
import Cultivator from './src/pages/Cultivator/Cultivator';
import ManufacturingProcess from './src/pages/Manufacturer/Manufacturer';
import Login from './src/pages/Authentication/Login';
import Signup from './src/pages/Authentication/SignUp';
import ForgotPassword from './src/pages/Authentication/ForgotPassword';
import BusinessRegistration from './src/pages/Authentication/BuisinessRegistration';
import EmployeeRegistration from './src/pages/Authentication/Employee';
import HarvestInformation from './src/pages/Cultivator/HarvestInformation';
import Selling from './src/pages/Cultivator/Selling';
import Buying from './src/pages/Cultivator/Buying';
import Regulator from './src/pages/Regulator/Regulator';
import SearchTransaction from './src/pages/Regulator/TransactionSearch';
import Hempmap from './src/pages/Regulator/RegulatorMap'
import Transporter from './src/pages/Transporter/Transporter';
import CheckDestination from './src/pages/Transporter/CheckDestination';
import QRGenerator from './src/pages/Transporter/GenerateQRCode';
import LogTransaction from './src/pages/Manufacturer/LogTransactions';
import Lab from './src/pages/LabWorker/LabWorker';
import LogReport from './src/pages/LabWorker/LogReport';
import CultTransaction from './src/pages/Cultivator/Transaction';
import TestPage from './src/pages/TestPage'
import ContractTable from './src/pages/Regulator/ContractTable';
import ContractEventDetails from './src/pages/Regulator/ContractEventDetails';
import QRScanner from './src/utility/qrScanner';

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
            <NavigationContainer>
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
                    <Stack.Screen name="TestPage" component={TestPage} />
                    <Stack.Screen name="ContractTable" component={ContractTable} />
                    <Stack.Screen name="ContractEventDetails" component={ContractEventDetails} />
                    <Stack.Screen name="QRScanner" component={QRScanner} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
