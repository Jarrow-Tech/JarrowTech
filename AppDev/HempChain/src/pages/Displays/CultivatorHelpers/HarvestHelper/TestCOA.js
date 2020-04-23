//This will be the display page for a user to take a picture of their COA 
// Need to store the image to firebase/the specific user
import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
  Image,
  Button
} from 'react-native';

import Prompt from 'react-native-input-prompt';
import ImagePicker from 'react-native-image-picker' 
import RNFetchBlob from 'rn-fetch-blob'
import CameraImagePicker from '../../../../Utilities/CameraImagePicker';
import storage from '@react-native-firebase/storage'




import { Typography, Spacing, UserInterface, Buttons} from '../../../../styles/index';


export default class TestResults extends Component {
       

    render() {
        return(
        
        <View style={Spacing.colorContainer}>
          <Text style={Typography.buttonText}>
              COA Image Selection Page
          </Text>
          <CameraImagePicker/>         
          <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.goBack()}>
              <Text style={Typography.buttonText}>
                  Go Back
              </Text>
          </TouchableOpacity>
      </View>
            
                
                
                
      );
    }
    

}
