import React from 'react';
import './../../App.css';
import { withAuthorization } from '../../components/session';

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

const condition = authUser => !!authUser;

export default withAuthorization(condition) (LawEnforcement);