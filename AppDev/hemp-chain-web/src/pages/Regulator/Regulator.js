import React from 'react';
import './../../App.css';
import { withAuthorization } from '../../components/session';

import * as ROLES from '../../constants/roles';
class Regulator extends React.Component {

    //TODO: Set uid and address to empty strings once testing is done
    constructor(props) {
        super(props);
        this.state = {
            'uid': 'cWhxiESZIZgM0ib0ygnjATrEizm2',
            'address': '-6897127765872353369'
        };
    }

    render() {
        return(
            <div>
                <h1>Regulator</h1>
                <form>
                    <label>
                        Uid:  <input type="text" defaultValue="" onChange={(e) => this.setState({'uid': e.target.value})} />
                    </label>
                    <br/>
                    <label>
                        Address:  <input type="text" defaultValue="" onChange={(e) => this.setState({'address': e.target.value})} />
                    </label>
                </form>
                <button onClick={() => this.props.history.push('/contract/' + this.state.uid + '/' + this.state.address)}>
                    Go to Contract Details
                </button>
            </div>
        )
    }
}

const condition = authUser => authUser && (authUser.agency === ROLES.REGULATOR || authUser.agency === ROLES.GOD);

export default withAuthorization(condition) (Regulator);