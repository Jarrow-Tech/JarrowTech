//CameraImagePicker
import React, {useState,Component} from 'react'
import * as firebase from 'firebase';
import 'firebase/firestore';
import{
    View,
    Button,
    TouchOpacity,
    Image,
    Platform,
    TouchableOpacity,
    Text,
    TextInput,
    Alert,

} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { ImagePickerOptions,Spacing,Buttons,Typography, UserInterface } from '../styles/index'
import FireBaseStorage from '../../App' 
import FirebaseImageStorage from './ImageFirebase/FirebaseImageStorage'
import uploadPost from './ImageFirebase/FirebaseImageStorage'
import { withFirebaseHOC } from './ImageFirebase/FirebaseContext'
import  { user } from '../../App'
import uuid from 'uuid'  


class CameraImagePicker extends Component{
  constructor(props) {
    super(props);
    this.state = {
      image:null,
      title: ' '
    };    
}
onChangeTitle = title => {
  this.setState({ title })    
}


uploadPost = (post) => {
  const id = uuid.v4()  
  const uploadData = {
  id: id,
  postPhoto: post.photo,
  postTitle: post.title
  }
  
  return firebase.firestore().collection('COA Images').doc(id).set(uploadData)
  
  }


selectImage = () => {
  const options = {
    noData: true
  }
  ImagePicker.launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker')
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error)
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton)
    } else {
      const source = { uri: response.uri }
      console.log(source)
      this.setState({
        image: source
      })
    }
  })
}
onSubmit = () => {
  try {
    const post = {
      photo: this.state.image,
      title: this.state.title
      
    }
    if(post == null){
      Alert.alert('Please Select an Image to Upload')
    }
    else{
      this.uploadPost(post)
      this.setState({
        image: null,
        title: '',
        description: ''
      })
      Alert.alert(
        'Certficate of Analysis Image',
        'Image Succesfully uploaded',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        { cancelable: false }
      )
    }   
  } catch (e) {
    Alert.alert(
      'Certficate of Analysis Image',
      'Error Uploading Image Please Try Again or Contact Support',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')}
      ],
      { cancelable: false }
    )
    
  }
}
render() {
      return (    
      <View style={{ flex: 1, marginTop: 60 }}>
      <View>
        {this.state.image ? (
      <Image
        source={this.state.image}
        style={{ width: '100%', height: 300 }}
        />
        ) : (
      <Button
        onPress={this.selectImage}
      style={{
      alignItems: 'center',
      padding: 10,
      margin: 30
      }}
      title= "Add an Image" 
          >  
       </Button>
  )}
        </View>
        <TextInput
          style={UserInterface.inputBox}
          placeholder="Enter Name, Hemp License ID"
          placeholderTextColor="#ffffff"
          selectionColor="#ffffff"
          value={this.state.title}
          onChangeText={title => this.onChangeTitle(title)}
          />  
        <View style={{ marginTop: 80, alignItems: 'center' }}>
        <Button status='success' onPress={this.onSubmit} title="Add post">
          </Button>
          </View>
          </View>
  )
  }
 }
 
export default withFirebaseHOC(CameraImagePicker);