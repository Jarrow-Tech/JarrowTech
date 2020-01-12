import React, {Component} from 'react'
import {StyleSheet,Text,View,Modal,TouchableHighlight, TouchableOpacity, Dimensions} from 'react-native'

export default class SimpleModal extends Component{
    constructor(props){
        super(props);
        this.state= {
            width: Dimensions.get('window').width, 

        };
        Dimensions.addEventListener('change',(e)=>{
            this.setState(e.window);
        });
    }
    closeModal = (data) =>{
        this.changeModalVisability(false);
        this.props.setData(data);


    }

    render(){
        return(
            <TouchableOpacity activeOpacity={1} disabled={true} style={styles.contentContainer}>
                <View style={[styles.modal,{width:this.state.width -80}]} >
                    <View style={styles.textView}>
                        <Text style={[styles.text, {fontSize:20} ]}> Modal Header</Text>
                        <Text style={styles.text}> Modal text</Text>

                    </View>
                <View style={styles.buttonView}>
                    <TouchableHighlight onPress={()=>this.closeModal('Cancel')} style={styles.touchableHighlight} underlayColor={'#f1f1f1'}>
                        <Text style={[styles.text, {color: 'blue'}]}> Cancel </Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.closeModal('OK')} style={styles.touchableHighlight} underlayColor={'#f1f1f1'} >
                        <Text style={[styles.text, {color: 'blue'}]}> OK </Text>
                    </TouchableHighlight>
                    </View>
                    </View>







            </TouchableOpacity>






        );
        
    
    }
}

    const styles= StyleSheet.create({
        contentContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
    
        },
        modal:{
            height: 150 ,
            paddingTop: 10,
            alignSelf: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: 10,
    
        },
        text:{
            margin:5,
            fontSize:16,
            fontWeight: 'bold',
    
        },
        touchableHighlight:{
            flex: 1,
            backgroundColor: 'white',
            paddingVertical: 10,
            alignSelf: 'stretch',
            alignItems: 'center',
            borderRadius: 10,
    
        },
        textView:{
            flex: 1,
            alignItems: 'center',
        },
        buttonView: {
            width: '100%',
            flexDirection: 'row',
        },

    });










    


























