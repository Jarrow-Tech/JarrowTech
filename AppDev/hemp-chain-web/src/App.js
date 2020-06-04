import React from 'react';
import './App.css';

import MenuBar from './pages/Navigation/MenuBar';
import Login from './pages/Authentication/Login';
import Cultivator from './pages/Cultivator/Cultivator';
import LabWorker from './pages/LabWorker/LabWorker';
import LawEnforcement from './pages/LawEnforcement/LawEnforcement';
import Manufacturer from './pages/Manufacturer/Manufacturer';
import Regulator from './pages/Regulator/Regulator';
import Transporter from './pages/Transporter/Transporter';
import ContractOverview from './pages/ContractDetails/ContractOverview';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { withAuthentication } from './components/session';

const App = () => (
    <Router>
        <div>
            <MenuBar />
            <hr />
            {/* Route switching. This needs to go from most specific and then
                cascade down to least specific. The first path that matches
                is where it will route */}
            <Switch>
                <Route path="/cultivator" component={Cultivator} />

                <Route path="/labworker" component={LabWorker} />

                <Route path="/lawenforcement" component={LawEnforcement} />

                <Route path="/manufacturer" component={Manufacturer} />

                <Route path="/regulator" component={Regulator} />

                <Route path="/transporter" component={Transporter} />

                <Route path="/contract/:uid/:address" component={ContractOverview} />

                <Route path="/" component={Login} />
            </Switch>
        </div>
    </Router>
)

export default withAuthentication(App);