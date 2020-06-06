import React from 'react';
import './../../App.css';
import { withAuthorization } from '../../components/session';

import * as ROLES from '../../constants/roles';

class Cultivator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    //TODO: Add API pass to register a lab event


    render() {
        return(
            <h1>Cultivator Page</h1>
        )
    }
}

const condition = authUser => authUser && (authUser.agency === ROLES.CULTIVATOR || authUser.agency === ROLES.GOD);

export default withAuthorization(condition) (Cultivator);