import React from 'react';
import './../../App.css';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../../components/session';
import SignOutButton from '../Authentication/Signout';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

const MenuBar = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => 
                authUser ? <NavigationAuth authUser={authUser}/> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
)

const NavigationAuth = ({ authUser }) => (
    <div>
        <ul>
            <li>
                <Link to={ROUTES.LANDING}>Home</Link>
            </li>
            {(authUser.agency === ROLES.REGULATOR || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to={ROUTES.REGULATOR}>Regulator Home</Link>
                </li>
            )}
            {(authUser.agency === ROLES.CULTIVATOR || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to={ROUTES.CULTIVATOR}>Cultivator Home</Link>
                </li>
            )}
            {(authUser.agency === ROLES.LABTECH || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to={ROUTES.LABTECH}>Law Worker Home</Link>
                </li>
            )}
            {(authUser.agency === ROLES.LAWENFORCEMENT || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to={ROUTES.LAWENFORCEMENT}>Law Enforcement Home</Link>
                </li>
            )}
            {(authUser.agency === ROLES.MANUFACTURER || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to={ROUTES.MANUFACTURER}>Manufacturer Home</Link>
                </li>
            )}
            {(authUser.agency === ROLES.TRANSPORTER || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to={ROUTES.TRANSPORTER}>Transporter Home</Link>
                </li>
            )}
            <li>
                <SignOutButton />
            </li>
        </ul>
    </div>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.LANDING}>Home</Link>
        </li>
    </ul>
);

export default MenuBar;