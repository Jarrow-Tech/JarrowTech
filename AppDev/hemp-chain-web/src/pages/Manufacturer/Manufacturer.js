import React from 'react';
import './../../App.css';
import { withAuthorization } from '../../components/session';

import * as ROLES from '../../constants/roles';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

class Manufacturer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    //TODO: Add API pass to register a lab event

    render() {
        return(
            <div>
                <h1>Manufacturer</h1>
                <InputGroup className="mb-3" style={{padding: 10}}>
                    <label style={{padding: 10}}>
                        Address:  <input type="text" defaultValue="" onChange={(e) => this.setState({address: e.target.value})} />
                    </label>
                    <label style={{padding: 10}}>
                        New State: <input type="text" defaultValue="" onChange={(e) => this.setState({hempState: e.target.value})} />
                    </label>
                    <div style={{padding: 10, position: 'relative', top: -4}}>
                        <Button onClick={() => console.log(this.state.hempState)}>
                            Update Hemp State
                        </Button>
                    </div>
                </InputGroup>
            </div>
        )
    }
}

const condition = authUser => authUser && (authUser.agency === ROLES.MANUFACTURER || authUser.agency === ROLES.GOD);

export default withAuthorization(condition) (Manufacturer);