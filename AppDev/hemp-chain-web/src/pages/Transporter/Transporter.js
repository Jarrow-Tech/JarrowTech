import React from 'react';
import './../../App.css';
import * as webHelper from './../../utility/webHelper';
import { withAuthorization } from '../../components/session';

class Transporter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null
        };
    }

    async getContractDetails(uid, addy) {
        console.log(uid.uid);
        let scanData = await webHelper.sendToServer('http://localhost:5000/api/web/scan', {
            "address": addy,
            "uid": uid
        });
        return scanData;
    }

    async getDestination() {
        let scanData = await this.getContractDetails(this.props.firebase.user, this.state.address);
        console.log(scanData);
        this.setState({'location': scanData[(Object.keys(scanData).length - 1).toString()]['location']});
    }

    render() {
        return(
            <div>
                <h1>Transporter Page</h1>
                <form>
                    <label>
                        Serial Number: <input type="text" onChange={(e) => this.setState({'address': e.target.value})} />
                    </label>
                </form>
                <button onClick={() => this.getDestination()}>Search</button>
                <h3>Going to {(this.state.location) ? this.state.locaiton : "unknown"} </h3>
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition) (Transporter);