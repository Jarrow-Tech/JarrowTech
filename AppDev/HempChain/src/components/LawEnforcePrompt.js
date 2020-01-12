import React, {Component} from 'react'
import {StyleSheet,Text,View,Modal,TouchableHighlight} from 'react-native'
import SimpleModal from './SimpleModal'

export default class LawModal extends Component{
    constructor(props){
        super(props);
        this.state= {
            isModalVisible: false,
            choosenData: ' ',

        };
    }
    changeModalVisibility = (bool) =>{
        this.setState({isModalVisible: bool});


    }
    setData = (data) => {
        this.setState({choosenData: data});
    }

    render(){
        return(
            <View style={styles.contentContainer}>
          <Modal visible={this.state.isModalVisible} onRequestClose={()=> this.changeModalVisibility(false)}>
                    <SimpleModal changeModalVisibility={this.changeModalVisibility} setData={this.setData}/>

                </Modal>    
                </View>   
            

        );
        
    
    }
}
const styles= StyleSheet.create({
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },});