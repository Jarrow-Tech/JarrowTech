import React, { Alert } from 'react';
import * as firebase from 'firebase';
import './../../App.css';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    loginUser = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
            if (firebase.auth().currentUser.emailVerified == false) {
                Alert.alert("Please Verify Email Address");
            } else if (firebase.auth().currentUser.emailVerified == true) {
                firebase.database().ref("Users/" + firebase.auth().currentUser.uid + "/agency").once('value').then((snapshot) => {
                    if(snapshot.val() == 'LabTester') {
                        this.props.history.push('/Lab');
                    } else if(snapshot.val() == 'Trucker') {
                        this.props.history.push('/Transporter');
                    } else if(snapshot.val() == 'Regulator') {
                        this.props.history.push('/Regulator');
                    } else if (snapshot.val() == 'Police/Highway') {
                        this.props.history.push('/LawEnforcement');
                    } else if (snapshot.val() == 'Farmer') {
                        this.props.history.push('/Cultivator');
                    } else if (snapshot.val() == 'Factory') {
                        this.props.history.push('/Manufacturer');
                    } else {
                        Alert.alert("Something has gone wrong. Please log in again. If the problem persists, contact our Help Center.");
                        this.props.navigation.navigate('Login');
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
                <form>
                    <label>
                        Email: <input type="text" defaultValue="" onChange={(e) => this.setState({'email': e.target.value})} />
                    </label>
                    <br/>
                    <label>
                        Password: <input type="password" defaultValue="" onChange={(e) => this.setState({'password': e.target.value})} />
                    </label>
                </form>
                <button onClick={() => this.loginUser(this.state.email, this.state.password)}>
                    Login
                </button>
            </div>
        )
    }
}

export default withRouter(Login);