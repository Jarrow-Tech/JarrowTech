import React from 'react';
import './../App.css';

import { withAuthorization } from '../components/session';

function TestPage() {
    return (
        <h1>You're on the Test Page</h1>
    );
}

const condition = authUser => !!authUser

export default withAuthorization(TestPage);