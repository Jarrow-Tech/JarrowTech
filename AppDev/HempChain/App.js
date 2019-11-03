//Carlton O. Wilcox made all of the current comments on 11/2/19

//This is the main file in which the app will run everything
//Greyed out text means that its not in use/declared

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
//import Login from './src/pages/Login';
//import SignUp from './src/pages/Sign-Up';

//Routes allows us to navigate to different pages much easier than using the standard react-navigation tools
// react-navigation tools are built into the react-native-router-flux github that is downloaded
import Routes from './src/Routes';


export default class App extends Component{
render(){
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

const styles= StyleSheet.create({
  container:{
    backgroundColor:'#455a64',
    flex:1,
    justifyContent:'center'    
  }
});




