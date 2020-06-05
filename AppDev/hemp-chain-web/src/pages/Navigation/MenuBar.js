import React from 'react';
import './../../App.css';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../../components/session';
import SignOutButton from '../Authentication/Signout';

import * as ROLES from '../../constants/roles';

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
                <Link to="/">Home</Link>
            </li>
            {(authUser.agency === ROLES.REGULATOR || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to="/regulator">Regulator Home</Link>
                </li>
            )}
            {(authUser.agency === ROLES.CULTIVATOR || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to="/cultivator">Cultivator Home</Link>
                </li>
            )}
            {(authUser.agency === ROLES.LABTECH || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to="/labworker">Law Worker Home</Link>
                </li>
            )}
            {(authUser.agency === ROLES.LAWENFORCEMENT || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to="/lawenforcement">Law Enforcement Home</Link>
                </li>
            )}
            {(authUser.agency === ROLES.MANUFACTURER || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to="/manufacturer">Manufacturer Home</Link>
                </li>
            )}
            {(authUser.agency === ROLES.TRANSPORTER || authUser.agency === ROLES.GOD) && (
                <li>
                    <Link to="/transporter">Transporter Home</Link>
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
            <Link to="/">Home</Link>
        </li>
    </ul>
);

export default MenuBar;