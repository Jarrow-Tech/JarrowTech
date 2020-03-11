import React, {useState} from 'react'
import{
    View,
    Button,
    TouchOpacity,
    Image,

} from 'react-native'

import ImagePicker from 'react-native-image-picker'
import { Spacing } from '../styles'

const CameraImagePicker = ({image, onImagePicked}) =>{


    const [selectedImage, setSelectedImage] = useState();



    pickImageHandler = () =>{
        ImagePicker.showImagePicker({title:'Choose Image of COA', maxWidth:800, maxHeight:600},
        response => {
            if(response.error){
                console.log("Image Error, Please close the app and try again")
            }
            else{
                console.log("Image: " + response.uri)
                setSelectedImage({uri: response.uri})
                onImagePicked({uri: response.uri})
            }
        }
        
        )


    }

    <View style={Spacing.colorContainer}>
        <View style={Spacing.imageContainer}>
            <Image />
        </View>
        <View>
            <TouchOpacity style={Buttons.iosPickerButton} onPress={this.pickImageHandler}>
            <Text style={Typography.buttonText}>
                    Pick Image
                </Text>
            </TouchOpacity>
        </View>
    </View>



}