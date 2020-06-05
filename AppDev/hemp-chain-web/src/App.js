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
import * as ROUTES from './constants/routes';

const App = () => (
    <Router>
        <div>
            <MenuBar />
            <hr />
            {/* Route switching. This needs to go from most specific and then
                cascade down to least specific. The first path that matches
                is where it will route */}
            <Switch>
                <Route path={ROUTES.CULTIVATOR} component={Cultivator} />

                <Route path={ROUTES.LABTECH} component={LabWorker} />

                <Route path={ROUTES.LAWENFORCEMENT} component={LawEnforcement} />

                <Route path={ROUTES.MANUFACTURER} component={Manufacturer} />

                <Route path={ROUTES.REGULATOR} component={Regulator} />

                <Route path={ROUTES.TRANSPORTER} component={Transporter} />

                <Route path={`${ROUTES.CONTRACT}${ROUTES.SUFFIX_UID}${ROUTES.SUFFIX_ADDRESS}`} component={ContractOverview} />

                <Route path={ROUTES.LANDING} component={Login} />
            </Switch>
        </div>
    </Router>
)

export default withAuthentication(App);