import React from 'react';
import './../../App.css';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../../components/session';
import SignOutButton from '../Authentication/Signout';

const MenuBar = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => 
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
)

const NavigationAuth = () => (
    <div>
        <ul>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/regulator">Regulator Home</Link>
            </li>
            <li>
                <Link to="/cultivator">Cultivator Home</Link>
            </li>
            <li>
                <Link to="/labworker">Law Worker Home</Link>
            </li>
            <li>
                <Link to="/lawenforcement">Law Enforcement Home</Link>
            </li>
            <li>
                <Link to="/manufacturer">Manufacturer Home</Link>
            </li>
            <li>
                <Link to="/transporter">Transporter Home</Link>
            </li>
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