import React from 'react';
import './../../App.css';
import { withAuthorization } from '../../components/session';

class LabWorker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <h1>LabWorker Page</h1>
        )
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition) (LabWorker);