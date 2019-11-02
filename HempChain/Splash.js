import React, { Component } from 'react';
import {View,Text} from 'react-native';

export default class Splash extends Component{
render()
{
    return(
        <View style={styles.wrapper}>
            <Text>

                why dis work againpp
            </Text>


        </View>
    );
}

}

const styles ={
    wrapper:{
        flex:1, 
        justifyContent: 'center', 
        alignItems:'center'

    }

}