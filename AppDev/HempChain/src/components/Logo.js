//This folder will contain elements such as our logo or other outside additons to be added to the pages
//This is the file for our logo to be ont he login page

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';

export default class Logo extends Component{
    render(){
      return(
        <View style={styles.container}>

        <Image style={{width:75, height: 85}}
        source={require('../Images/JarrowTech.png')}/>
        <Text style={styles.logoText}>Welcome to HempChain!</Text>


        </View>
        
      );
    }
    
    }


    const styles= StyleSheet.create({
        container:{
          flexGrow:1,
          alignItems:'center',
          justifyContent:'flex-end'    
        },
        logoText:{
          marginVertical: 15,
          fontSize:18,
          color: 'rgba(255, 255, 255, 0.7)'
        },
      });
      
      