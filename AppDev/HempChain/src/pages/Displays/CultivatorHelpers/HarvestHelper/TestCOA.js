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
import CameraImagePicker from '../../../../components/CameraImagePicker';



import { Typography, Spacing, UserInterface, Buttons } from '../../../../styles/index';

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export function uploadImage(image, on )

export default class TestResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
          filePath: {},
          fileData: ' ',
          fileUri: ' ',
        };
        this.chooseImage=this.chooseImage.bind(this)
      }
      chooseImage = () => {
        var options = {
          title: 'Select Image',
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        }

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              let source = response;
              this.setState({
                filePath: source,
                fileData: source.data,
                fileUri: source.uri
              });
            }
          });
        };

    

    render() {
        return(
            <View style={Spacing.colorContainer}>
                <Text style={Typography.buttonText}>
                    Certificate of Analysis Page
                </Text>
            
           
              <Image
                source={{ uri: this.state.filePath.uri }}
                style={{ width: 250, height: 250 }}
               />      
               
               
               <TouchableOpacity style={Buttons.button} onPress={()=>this.chooseImage()}>
                    <Text style={Typography.buttonText}>
                        Select or Take a Photo
                    </Text>
                </TouchableOpacity> 
                <TouchableOpacity style={Buttons.button} onPress={()=>this.submitImage()}>
                    <Text style={Typography.buttonText}>
                        Submit
                    </Text>
                </TouchableOpacity> 

                <TouchableOpacity style={Buttons.button} onPress={()=>this.props.navigation.goBack()}>
                    <Text style={Typography.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    

}




    /*
    
      
    
      render() {
        return (
          <View style={styles.container}>
            <View style={styles.container}>
             
            </View>
          </View>
        );
      }
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });








    */