import React from 'react';
import './../../App.css';
import { withAuthorization } from '../../components/session';

import * as ROLES from '../../constants/roles';

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

const condition = authUser => authUser && (authUser.agency === ROLES.LAWENFORCEMENT || authUser.agency === ROLES.GOD);

export default withAuthorization(condition) (LawEnforcement);