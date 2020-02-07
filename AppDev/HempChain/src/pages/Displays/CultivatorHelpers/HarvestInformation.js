//This will be the display page for a user whos' agencey type is Cultivator
import * as firebase from 'firebase';

import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

import Prompt from 'react-native-input-prompt';

//See sign-up pg for notes
import { Actions } from 'react-native-router-flux';
import { user } from '../../../../App';

export default class Cultivator extends Component{
  constructor(props) {
    super(props)
    this.state= ({
      cropSize: 0,
      cropType: '',
    });
    this.harvest = this.harvest.bind(this);
  }

  harvest() {
    this.props.harvest(this.state);
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.buttonText}>
          Enter Harvest Details Below
        </Text>
        <TextInput style={styles.inputBox}
         placeholder="Crop Size"
         placeholderTextColor="#ffffff"
         selectionColor="#ffffff"
         value={this.state.cropSize}
         onChangeText={(text)=> this.setState({cropSize: text})}
         autoCapitalize="none"
         autoCorrect={false}
          />
        <TextInput style={styles.inputBox}
         placeholder="Crop Type"
         placeholderTextColor="#ffffff"
         selectionColor="#ffffff"
         value={this.state.cropType}
         onChangeText={(text)=> this.setState({cropType: text})}
         autoCapitalize="none"
         autoCorrect={false}
          />
        <TouchableOpacity style={styles.button} onPress={()=>this.harvest()}>
          <Text style={styles.buttonText}>
            Log Harvest Details
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles= StyleSheet.create({
  container: {
    flexGrow:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#455a64',
  },
  inputBox: {
      width:300,
      backgroundColor:'rgba(255,255,255,0.3)',
      borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#ffffff',
      marginVertical: 10,
  },
  button: {
      width:300,
      backgroundColor:'#1c313a',
      borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 12,
      alignContent: 'center',
  },
  buttonText: {
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  },
  signupText: {
    color:'rgba(255, 255, 255, 0.6)',
    fontSize: 16
  },
});
