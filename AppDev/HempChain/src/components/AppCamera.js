import React, { Component } from 'react';

import { View, Text, } from 'react-native';

import { RNCamera } from 'react-native-camera';

export default class AppCamera extends Component {
    constructor(props) {
        super(props)
        this.state= {
            barcodes: [],
        }
    }

    barcodeRecognized = e => {
        this.props.setSerial(e.data)
    }

    /*
     * Functions to hopefully render bar codes; however, they need
     * adjustment at the moment. We need to have an array of barcodes
     * in the state to avoid render errors. At the moment these don't
     * interfere with anything - see below link for source.
     * https://www.toptal.com/react-native/react-native-camera-tutorial
     */

    renderBarcodes = () => {
        <View>
            {this.state.barcodes.map(this.renderBarcode)}
        </View>
    }

    renderBarcode = ({bounds, data}) => {
        <React.Fragment key = {data + bounds.origin.x}>
            <View
                style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    position: 'absolute',
                    borderColor: '#a42372',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    padding: 10,
                    ...bounds.size,
                    left: bounds.origin.x,
                    top: bounds.origin.y,
                }}
                >
                    <Text style={{
                        color: '#FFFFFF',
                        flex: 1,
                        position: 'absolute',
                        textAlign: 'center',
                        backgroundColor: 'transparent',
                    }}>{data}</Text>
                </View>
        </React.Fragment>
    }

    render(){
        return (
            <RNCamera
                ref={ref => {
                    this.camera = ref;
                }}
                style={{
                    flex: 1,
                    width: '50%',
                }}
                barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
                flashMode={RNCamera.Constants.FlashMode.on}
                onBarCodeRead={this.barcodeRecognized}>
                {this.renderBarcodes()}
            </RNCamera>
        )
    }
}