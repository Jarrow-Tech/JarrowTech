import React from 'react';
import './../../App.css';
import { withAuthorization } from '../../components/session';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

class LawEnforcement extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            'uid': this.props.firebase.getUid(),
            'address': '-6897127765872353369'
        };
    }

    render() {
        return(
            <div>
                <h1>Law Enforcement</h1>
                <InputGroup className="mb-3" style={{padding: 10}}>
                    <label style={{padding: 10}}>
                        Address:  <input type="text" defaultValue="" onChange={(e) => this.setState({'address': e.target.value})} />
                    </label>
                    <div style={{padding: 10, position: 'relative', top: -4}}>
                        <Button onClick={() => this.props.history.push(`${ROUTES.CONTRACT}/${this.state.uid}/${this.state.address}`)}>
                            Go to Contract Details
                        </Button>
                    </div>
                </InputGroup>
            </div>
        )
    }
}

const condition = authUser => authUser && (authUser.agency === ROLES.LAWENFORCEMENT || authUser.agency === ROLES.GOD);

export default withAuthorization(condition) (LawEnforcement);