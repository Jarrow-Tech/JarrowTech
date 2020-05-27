import React from 'react';
import './../../App.css';
import * as webHelper from './../../utility/webHelper';
import { withRouter } from 'react-router-dom';

class ContractOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scanData: null
        };
    }

    async getContractDetails(uid, addy) {
        let scanData = await webHelper.sendToServer('http://localhost:5000/api/web/scan', {
            "address": addy,
            "uid": uid
        });
        let eventCount = Object.keys(scanData).length;
        this.setState({'scanData': scanData});
        this.setState({'eventCount': eventCount});
    }

    componentDidMount() {
        if (!this.state.scanData) {
            this.getContractDetails(this.props.match.params.uid, this.props.match.params.address);
        }
    }

    renderScanData() {
        let keys = [...Array(this.state.eventCount).keys()];
        keys.shift();
        return (
            <div>
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
            </div>
            
        )
    }

    renderButton(eventType, grower, owner, cropSize, time, eventId) {
        return(
            <div>
                <h3>
                    {eventType}
                </h3>
                <p>
                    Crop Size: {cropSize}
                </p>
                <p>
                    Time: {time}
                </p>
                <p>
                    Grower: {grower}
                </p>
                <p>
                    Owner: {owner}
                </p>
                <p>
                    {eventId}
                </p>
            </div>
        )
    }

    render() {
        return(
            <div>
                <h2>You're on the ContractOverview page</h2>
                {(this.state.scanData) ?
                    this.renderScanData()
                :
                    <p>Loading Contract Details</p>
                }
            </div>
        )
    }
}

export default withRouter(ContractOverview);