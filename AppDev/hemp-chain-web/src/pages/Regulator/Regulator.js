import React from 'react';
import './../../App.css';

export default class Regulator extends React.Component {

    constructor(props) {
        super(props);
        this.state = { };

        this.fetchContract = this.fetchContract.bind(this);
    }

    fetchContract() {
        fetch('/api/scan', {method: "POST", 
                            body: { uid: 'cWhxiESZIZgM0ib0ygnjATrEizm2', 
                                    address: '-6897127765872353369'}})
            .then(res => res.json())
            .then(data => {
                this.setState({'contract': data});
            });
    }

    render() {
        return(
            <div>
                <h1>Regulator</h1>
                <button onClick={this.fetchContract}>
                    Fetch Contract
                </button>
                <p>{this.state.contract}</p>
            </div>
        )
    }
}