//Routes is an API that is built over react-native's navigation
//It allows us to go from page to page much easier
//It must be installed using npm i --save react-native-router-flux
//It is from an open-source github repo link is below w/ additional infomation
// as well as the lisencing info for our use of it. (open-source)
//https://github.com/aksonov/react-native-router-flux
//https://github.com/aksonov/react-native-router-flux/blob/master/LICENSE

import React, {Component} from 'react';
//Here is where tools from react-native-router-flux can be imported
import { Router, Stack, Scene } from 'react-native-router-flux';

import Login from './pages/Login';
import SignUp from './pages/Sign-Up';
import buisRegistration from './pages/BuisRegistration';


//The stack always stay "root" unless specifed
//Scence's are what the user will see
//component={class or page to be called/displayed}
//to add other Scene's add under the previous.
export default class Routes extends Component{
    render(){
        return(
            <Router>
                <Stack key="root" hideNavBar={true}>
                    <Scene key="login" component={Login} title="Login" initial={true}/>
                    <Scene key="signup" component={SignUp} title="Register"/>
                    <Scene key="buisRegistration" component={buisRegistration} title="Register"/>

                </Stack>
            </Router>

        );
    }

}