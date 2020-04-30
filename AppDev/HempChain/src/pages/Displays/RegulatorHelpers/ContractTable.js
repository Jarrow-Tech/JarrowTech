// table page for the Regulator, to be filled in with contract information

import React, { Component } from 'react';
import {
    Button,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
} from 'react-native';
import { Buttons, Spacing, Typography } from '../../../styles';

export default class ContractTable extends Component {
    constructor(props){
        super(props)
        this.state = ({
            contractHex: '',
            events: [],
        });
    }

    renderTop(){
        return (
            <View style={Spacing.tableRow}>
                <View style={Spacing.tableCell}>
                    <Text style={Typography.buttonText}>
                        Event
                    </Text>
                </View>
                <View style={Spacing.tableCell}>
                    <Text style={Typography.buttonText}>
                        Grower Address
                    </Text>
                </View>
                <View style={Spacing.tableCell}>
                    <Text style={Typography.buttonText}>
                        Owner Address
                    </Text>
                </View>
                <View style={Spacing.tableCell}>
                    <Text style={Typography.buttonText}>
                        Chain of Custody Role
                    </Text>
                </View>
            </View>
        )
    }

    renderRow(){
        // get contract information into state
        return (
            <View style={Spacing.tableRow}>
                <View style={Spacing.tableCell} />
                <View style={Spacing.tableCell} />
                <View style={Spacing.tableCell} />
                <View style={Spacing.tableCell} />
                <View style={Spacing.tableCell} />
            </View>
        );
    }

    render(){
        const data = [1, 2, 3, 4, 5];
        return (
            <View style={Spacing.colorContainer}>
                <View style={Spacing.table}>
                {
                    this.renderTop()
                }
                </View>
                <TouchableOpacity style={Buttons.button} onPress={() => this.props.navigation.goBack()}>
                    <Text style={Typography.buttonText}>
                        Go Back
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}