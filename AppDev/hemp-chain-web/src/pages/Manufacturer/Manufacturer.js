import React from 'react';
import './../../App.css';
import { withAuthorization } from '../../components/session';

class Manufacturer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <h1>Manufacturer Page</h1>
        )
    }
}

const condition = authUser => !!authUser

export default withAuthorization(condition) (Manufacturer);