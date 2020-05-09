// table page for the Regulator, to be filled in with contract information

import * as firebase from 'firebase';

import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import { Buttons, Spacing, Typography } from '../../../styles';
import * as webHelp from '../../../utility/webHelper';

// used to configure scrolling view
const {height} = Dimensions.get('window');

export default class ContractTable extends Component {
    constructor(props){
        super(props)
        this.state = ({
            scanData: false,
            screenHeight: height,
        });
    }

    // async call that fires as soon as the page is initialized
    // gets all the contract details from the database and stashes them in the class state
    // also sets eventCount to the number of events
    async getContractDetails(contractAddress) {
        let scanData = await webHelp.sendToServer('http://10.0.2.2:5000/api/web/scan', {
            address: contractAddress,
            uid: firebase.auth().currentUser.uid
        })
        let eventCount = Object.keys(scanData).length;
        this.setState({'scanData': scanData});
        this.setState({'eventCount': eventCount});
    }

    // if the scan data hasn't been fetched yet, this grabs it as soon as the page is initialized
    componentDidMount() {
        if (!this.state.scanData) {
            this.getContractDetails(this.props.route.params.contractAddress)
        }
    }

    // helper function to dynamically size the ScrollView
    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({screenHeight: contentHeight})
    }

    // top level function for mapping the number of events to the buttons
    // relies on the eventCount state value to compute the number of data rows to render and then maps
    // the array `keys` to a button that is full of their data
    renderScanData() {
        let keys = [...Array(this.state.eventCount).keys()];
        keys.shift();
        console.log('rendering scan data');
        return (
            <View style={Spacing.colorContainer}>
                {
                    keys.map(key => (
                        this.renderButton(
                            this.state.scanData[key]['eventType'],
                            this.state.scanData[key]['grower'],
                            this.state.scanData[key]['owner'],
                            this.state.scanData[key]['cropSize'],
                            this.state.scanData[key]['time'],
                            key
                    )))
                }
            </View>
        )
    }

    // takes all of the data for a data entry and formats it into the button
    renderButton(eventType, grower, owner, cropSize, time, eventId) {
        return(
        <View style={Spacing.eventRow}>
            <View style={Spacing.eventItem}>
                <Text style={Typography.titleText}>
                    {eventType}
                </Text>
                <Text style={Typography.leftText}>
                    Crop Size: {cropSize}
                </Text>
                <Text style={Typography.leftText}>
                    Time: {time}
                </Text>
                <Text style={Typography.leftText}>
                    Grower: {grower}
                </Text>
                <Text style={Typography.leftText}>
                    Owner: {owner}
                </Text>
            </View>
            <View style={Spacing.eventItem}>
                <TouchableOpacity style={Buttons.rowDetailsButton} onPress={() => console.log(eventId)}>
                    <Text style={Typography.centeredText}>
                        Full details
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }

    render(){
        const scrollEnabled = this.state.screenHeight > height; // used for dynamic ScrollView
        return (
            <View style={Spacing.colorContainer}>
                <Image style={{width: 75, height: 85, margin: 40}}
                source={require('../../../Images/JarrowTech.png')} />
                <ScrollView style={{flex:1}}
                    contentContainerStyle={{flexGrow:1}}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}>
                    <View style={Spacing.table}>
                        { (this.state.scanData != false) ? this.renderScanData() : console.log('no scan data present') }
                    </View>
                </ScrollView>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.goBack()}>
                    <Text style={Typography.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}
