import React from 'react';
import './../../App.css';
import * as webHelper from './../../utility/webHelper';
import { withAuthorization } from '../../components/session';

import * as ROLES from '../../constants/roles';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

class Transporter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
            uid: this.props.firebase.getUid(),
            address: '-6897127765872353369',
            show: false,
        };
    }

    async getContractDetails(addy) {
        console.log(this.props.firebase.getUid);
        let scanData = await webHelper.sendToServer('http://localhost:5000/api/web/scan', {
            address: addy,
            uid: this.state.uid,
        });
        return scanData;
    }

    async getDestination() {
        let scanData = await this.getContractDetails(this.state.address);
        console.log(scanData);
        this.setState({'location': scanData[(Object.keys(scanData).length - 1).toString()]['location'], show: true});
    }

    render() {
        return(
            <div>
                <h1>Transporter Page</h1>
                <InputGroup className="mb-3" style={{padding: 10}}>
                    <label style={{padding:10}}>
                        Serial Number: <input type="text" onChange={(e) => this.setState({'address': e.target.value})} />
                    </label>
                    <div style={{padding: 10, position: 'relative', top: -4}}>
                        <Button onClick={() => this.getDestination()}>
                            Get Destination
                        </Button>
                    </div>
                </InputGroup>
                
                <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Destination</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>{this.state.location}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({ show: false })}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const condition = authUser => authUser && (authUser.agency === ROLES.TRANSPORTER || authUser.agency === ROLES.GOD);

export default withAuthorization(condition) (Transporter);