import React from 'react';
import './../../App.css';
import { withRouter } from 'react-router-dom';

class LawEnforcement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <h1>LawEnforcement Page</h1>
        )
    }
}

export default withRouter(LawEnforcement);