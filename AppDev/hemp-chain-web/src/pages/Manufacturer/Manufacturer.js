import React from 'react';
import './../../App.css';
import { withAuthorization } from '../../components/session';

import * as ROLES from '../../constants/roles';

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

const condition = authUser => authUser && (authUser.agency === ROLES.MANUFACTURER || authUser.agency === ROLES.GOD);

export default withAuthorization(condition) (Manufacturer);