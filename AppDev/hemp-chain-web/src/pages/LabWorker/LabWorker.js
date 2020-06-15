import React from 'react';
import './../../App.css';
import { withAuthorization } from '../../components/session';

import * as ROLES from '../../constants/roles';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

class LabWorker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            serial: '',
            thc: 0,
        };
    }

    //TODO: Add API pass to register a lab event

    render() {
        return(
            <div>
                <h1>LabWorker Page</h1>

                <InputGroup className="mb-3" style={{padding: 10}}>
                    <label style={{padding: 10}}>
                        Conntract ID: <input type="text" defaultValue="" onChange={(e) => this.setState({serial: e.target.value})} />
                    </label>
                    <label style={{padding: 10}}>
                        THC Levels: <input type="text" defaultValue="" onChange={(e) => this.setState({thc: e.target.value})} />
                    </label>
                    <div style={{padding: 10, position: 'relative', top: -4}}>
                            <Button onClick={() => console.log("Logging THC Levels")}>
                                Log Test Results
                            </Button>
                        </div>
                </InputGroup>
            </div>
            
        )
    }
}

const condition = authUser => authUser && (authUser.agency === ROLES.LABTECH || authUser.agency === ROLES.GOD);

export default withAuthorization(condition) (LabWorker);