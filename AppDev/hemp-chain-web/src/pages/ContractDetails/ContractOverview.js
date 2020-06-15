import React from 'react';
import './../../App.css';
import * as webHelper from './../../utility/webHelper';
import { withAuthorization } from '../../components/session';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class ContractOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scanData: null,
            show: false,
            showState: 0,
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
            <Table striped bordered hover responsive style={{marginLeft: '5%', marginTop: '25px', width: '90%'}}>
                <thead>
                    <tr>
                        <th>Action</th>
                        <th>Crop Size</th>
                        <th>Log Time</th>
                        <th>Grower ID</th>
                        <th>Owner ID</th>
                        <th>Event Num</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </Table>
            
        )
    }

    renderButton(eventType, grower, owner, cropSize, time, eventId) {
        return(
            <tr>
                <td>
                    {eventType}
                </td>
                <td>
                    {cropSize}
                </td>
                <td>
                    {time}
                </td>
                <td>
                    {grower}
                </td>
                <td>
                    {owner}
                </td>
                <td>
                    <Button onClick={() => this.setState({ show: true, showState: eventId })}>
                        View Details
                    </Button>

                    <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.scanData[this.state.showState]['eventType']}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>Crop Size: {this.state.scanData[this.state.showState]['cropSize']}</p>
                            <p>Time: {this.state.scanData[this.state.showState]['time']}</p>
                            <p>Grower: {this.state.scanData[this.state.showState]['grower']}</p>
                            <p>Owner: {this.state.scanData[this.state.showState]['owner']}</p>
                            <p>CoA: {this.state.scanData[this.state.showState]['coa'].toString()}</p>
                            <p>Address: {this.state.scanData[this.state.showState]['location']}</p>
                            <p>Hemp State: {this.state.scanData[this.state.showState]['hempState']}</p>
                            <p>State: {this.state.scanData[this.state.showState]['state'].toString()}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </td>
            </tr>
        )
    }

    render() {
        return(
            <div>
                <h2 style={{paddingLeft: '5%'}}>Contract Overview</h2>
                {(this.state.scanData) ?
                    this.renderScanData()
                :
                    <p>Loading Contract Details</p>
                }
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition) (ContractOverview);