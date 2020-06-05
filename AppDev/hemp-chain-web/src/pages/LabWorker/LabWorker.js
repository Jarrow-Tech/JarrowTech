import React from 'react';
import './../../App.css';
import { withAuthorization } from '../../components/session';

import * as ROLES from '../../constants/roles';

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

const condition = authUser => authUser && (authUser.agency === ROLES.LABTECH || authUser.agency === ROLES.GOD);

export default withAuthorization(condition) (LabWorker);