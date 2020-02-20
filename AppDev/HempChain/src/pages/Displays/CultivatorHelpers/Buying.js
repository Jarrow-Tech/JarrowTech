//This will be the display page for a user whos' agencey type is Cultivator
import * as firebase from 'firebase';

import React, { Component } from 'react';
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
import { user } from '../../../../App';

export default class Buying extends Component{
    constructor(props) {
        super(props)
        this.state = ({ });
        this.buy = this.buy.bind(this);
    }

    //Firebase signout function
    onSignoutPress = () => {
        firebase.auth().signOut().then(() => {
            Alert.alert("Successfully signed out")
        }, (error) => {
            Alert.alert(error.message);
        });
        this.props.navigation.navigate('Login');
    }

    buy() {
        this.props.route.params.buy(this.state);
        this.props.navigation.goBack();
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.buttonText}>
                    Cultivator Page
                </Text>
                <Text style={styles.buttonText}>
                    Purchasing Page
                </Text>
                <TouchableOpacity style={styles.button} onPress={()=>this.buy()}>
                    <Text style={styles.buttonText}>
                        Buy Stuff
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.goBack()}>
                    <Text style={styles.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>this.onSignoutPress(this.state.email)}>
                    <Text style={styles.buttonText}>
                        Sign Out
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#455a64',
    },
    inputBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        marginVertical: 10,
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
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
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 16
    },
});
