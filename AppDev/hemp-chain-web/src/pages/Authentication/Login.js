import React, { Alert } from 'react';
import * as firebase from 'firebase';
import './../../App.css';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    loginUser = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
            if (firebase.auth().currentUser.emailVerified === false) {
                Alert.alert("Please Verify Email Address");
            } else if (firebase.auth().currentUser.emailVerified === true) {
                firebase.database().ref("Users/" + firebase.auth().currentUser.uid + "/agency").once('value').then((snapshot) => {
                    if(snapshot.val() === 'LabTester') {
                        this.props.history.push(ROUTES.LABTECH);
                    } else if(snapshot.val() === 'Trucker') {
                        this.props.history.push(ROUTES.TRANSPORTER);
                    } else if(snapshot.val() === 'Regulator') {
                        this.props.history.push(ROUTES.REGULATOR);
                    } else if (snapshot.val() === 'Police/Highway') {
                        this.props.history.push(ROUTES.LAWENFORCEMENT);
                    } else if (snapshot.val() === 'Farmer') {
                        this.props.history.push(ROUTES.CULTIVATOR);
                    } else if (snapshot.val() === 'Factory') {
                        this.props.history.push(ROUTES.MANUFACTURER);
                    } else if (snapshot.val() === 'GodMode') {
                        this.props.history.push(ROUTES.REGULATOR);
                    } else {
                        Alert.alert("Something has gone wrong. Please log in again. If the problem persists, contact our Help Center.");
                        this.props.navigation.navigate(ROUTES.LANDING);
                    }
                })
            }
        }, (error) => {
            Alert.alert(error.message);
        });
    }

    render() {
        return(
            <div>
                <h1>Login Page</h1>
                <InputGroup className="mb-3" style={{padding: 10}}>
                    <label style={{padding: 10}}>
                        Email: <input type="text" defaultValue="" onChange={(e) => this.setState({'email': e.target.value})} />
                    </label>
                    <br/>
                    <label style={{padding: 10}}>
                        Password: <input type="password" defaultValue="" onChange={(e) => this.setState({'password': e.target.value})} />
                    </label>
                    <div style={{padding: 10, position: 'relative', top: -4}}>
                        <Button onClick={() => this.loginUser(this.state.email, this.state.password)}>
                            Login
                        </Button>
                    </div>
                </InputGroup>
            </div>
        )
    }
}

export default withRouter(Login);