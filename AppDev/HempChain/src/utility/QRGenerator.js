'use strict';
 
import React, { Component } from 'react'
import QRCode from 'react-native-qrcode-generator';
 
import {
    AppRegistry,
    StyleSheet,
    View,
    TextInput
} from 'react-native';
 
export default class QRGenerator extends Component {
  state = {
    text: 'https://jarrowtech.com/',
  };
 
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text: text})}
          value={this.state.text}
        />
        <QRCode
          value={this.state.text}
          size={200}
          bgColor='black'
          fgColor='white'/>
      </View>
    );
  };
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    }
});
 
AppRegistry.registerComponent('QRGenerator', () => QRGenerator);
 
module.exports = QRGenerator;