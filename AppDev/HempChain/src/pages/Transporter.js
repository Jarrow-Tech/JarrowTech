

import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default class GovPage extends Component{

    render(){
      return(
        <View style={styles.container}>
            <TextInput style={styles.inputBox}
             placeholder="Enter Transportation Company"
             placeholderTextColor="#ffffff"
             selectionColor="#ffffff"
              />
              <TextInput style={styles.inputBox}
             placeholder="Enter Trucker I.D. #"
             placeholderTextColor="#ffffff"
             selectionColor="#ffffff"
              />
              <TouchableOpacity style={styles.button}>
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
          justifyContent:'center'
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
        }


      });