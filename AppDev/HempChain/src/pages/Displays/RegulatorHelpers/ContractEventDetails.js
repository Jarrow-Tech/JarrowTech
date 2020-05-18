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

export default class ContractEventDetails extends Component {
    constructor(props){
        super(props)
        this.state = ({
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

    // takes all of the data for a data entry and formats it into the button
    displayDetails(eventDetails) {
        return(
        <View style={Spacing.eventRow}>
            <View style={Spacing.eventItem}>
                <Text style={Typography.titleText}>
                    {eventDetails['eventType']}
                </Text>
                <Text style={Typography.leftText}>
                    Crop Size: {eventDetails['cropSize']}
                </Text>
                <Text style={Typography.leftText}>
                    Time: {eventDetails['time']}
                </Text>
                <Text style={Typography.leftText}>
                    Grower: {eventDetails['grower']}
                </Text>
                <Text style={Typography.leftText}>
                    Owner: {eventDetails['owner']}
                </Text>
                <Text style={Typography.leftText}>
                    CoA: {eventDetails['coa'].toString()}
                </Text>
                <Text style={Typography.leftText}>
                    Address: {eventDetails['location']}
                </Text>
                <Text style={Typography.leftText}>
                    Hemp State: {eventDetails['hempState']}
                </Text>
                <Text style={Typography.leftText}>
                    State: {eventDetails['state'].toString()}
                </Text>
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
                        { this.displayDetails(this.props.route.params.eventDetails) }
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
