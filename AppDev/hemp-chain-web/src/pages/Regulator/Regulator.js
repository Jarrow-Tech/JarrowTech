import React from 'react';
import './../../App.css';
import * as webHelper from './../../utility/webHelper';
import { withRouter } from 'react-router-dom';

class Regulator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'uid': 'cWhxiESZIZgM0ib0ygnjATrEizm2',
            'address': '-6897127765872353369'
        };

        this.fetchContract = this.fetchContract.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async fetchContract(uid, addy) {
        let scanData = await webHelper.sendToServer('http://localhost:5000/api/web/scan', {
            "uid": uid,
            "address": addy
        });
        this.setState({"contract": scanData});
        console.log(scanData);
    }

    handleSubmit(event) {
        this.fetchContract(this.state.uid, this.state.address);
        event.preventDefault();
    }

    render() {
        return(
            <div>
                <h1>Regulator</h1>
                <p>Address: -6897127765872353369</p>
                <p>Uid: cWhxiESZIZgM0ib0ygnjATrEizm2</p>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Uid:  <input type="text" defaultValue="cWhxiESZIZgM0ib0ygnjATrEizm2" onChange={(e) => this.setState({'uid': e.target.value})} />
                    </label>
                    <br></br>
                    <label>
                        Address:  <input type="text" defaultValue="-6897127765872353369" onChange={(e) => this.setState({'address': e.target.value})} />
                    </label>
                    <br></br>
                    <input type="submit" value="Submit" /> 
                </form>
                <button onClick={() => this.props.history.push('/regulator/details/' + this.state.uid + '/' + this.state.address)}>
                    Go to Contract Details
                </button>
            </div>
        )
    }
}

export default withRouter(Regulator);