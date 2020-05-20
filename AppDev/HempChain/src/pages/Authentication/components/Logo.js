//This folder will contain elements such as our logo or other outside additons to be added to the pages
//This is the file for our logo to be ont he login page
//Any other png. or jpeg's must be copied into the Images folder
//in src.

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import { Typography, Spacing, UserInterface, Buttons } from '../../../styles/index';

export default class Logo extends Component {
    render() {
        return(
            <View style={Spacing.logoContainer}>
                <Image style={{width: 75, height: 85}}
                source={require('../../../../assets/JarrowTech.png')} />
                <Text style={Typography.logoText}>
                    Welcome to HempChain!
                </Text>
            </View>
        );
    }
}
