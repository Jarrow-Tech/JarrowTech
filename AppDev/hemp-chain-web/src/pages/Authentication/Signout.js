import React from 'react';

import { withFirebase } from '../../components/firebase';

import Button from 'react-bootstrap/Button';

const SignOutButton = ({ firebase }) => (
    <Button style={{marginLeft: '30px'}} onClick={firebase.doSignOut}>
        Sign Out
    </Button>
);

export default withFirebase(SignOutButton);