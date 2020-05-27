import React from 'react';
import './../../App.css';
import { withRouter } from 'react-router-dom';

class Cultivator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <h1>Cultivator Page</h1>
        )
    }
}

export default withRouter(Cultivator);