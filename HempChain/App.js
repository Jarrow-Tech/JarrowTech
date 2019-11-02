import React, { Component } from 'react';
import { StyleSheet,Text, View,Button,Alert } from 'react-native';
import Splash from './Splash';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <Splash
      >
        
      </Splash>

    
    );
  }
}

const styles= StyleSheet.create({
  buttonContainer:{
    backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'red',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 10,
    shadowOpacity: 0.25
  }
})