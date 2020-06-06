import React from 'react';
import './../../App.css';
import { AuthUserContext } from '../../components/session';
import SignOutButton from '../Authentication/Signout';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const MenuBar = () => (
    <div className="container">
        <Navbar bg="light">
            <Navbar.Brand href="https://jarrowtech.com">JarrowTech</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <AuthUserContext.Consumer>
                    {authUser => 
                        authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
                    }
                </AuthUserContext.Consumer>
            </Navbar.Collapse>
        </Navbar>
    </div>
    
)

const NavigationAuth = ({ authUser }) => (
    <Nav className="mr-auto">
        <Nav.Link sytyle={{paddingLeft: '30px'}} href={ROUTES.LANDING}>Home</Nav.Link>

        {(authUser.agency === ROLES.REGULATOR || authUser.agency === ROLES.GOD) && (
            <Nav.Link style={{paddingLeft: '30px'}} href={ROUTES.REGULATOR}>Regulator Home</Nav.Link>
        )}
        {(authUser.agency === ROLES.CULTIVATOR || authUser.agency === ROLES.GOD) && (
            <Nav.Link style={{paddingLeft: '30px'}} href={ROUTES.CULTIVATOR}>Cultivator Home</Nav.Link>
        )}
        {(authUser.agency === ROLES.LABTECH || authUser.agency === ROLES.GOD) && (
            <Nav.Link style={{paddingLeft: '30px'}} href={ROUTES.LABTECH}>Lab Worker Home</Nav.Link>
        )}
        {(authUser.agency === ROLES.LAWENFORCEMENT || authUser.agency === ROLES.GOD) && (
            <Nav.Link style={{paddingLeft: '30px'}} href={ROUTES.LAWENFORCEMENT}>Law Enforcement Home</Nav.Link>
        )}
        {(authUser.agency === ROLES.MANUFACTURER || authUser.agency === ROLES.GOD) && (
            <Nav.Link style={{paddingLeft: '30px'}} href={ROUTES.MANUFACTURER}>Manufacturer Home</Nav.Link>
        )}
        {(authUser.agency === ROLES.TRANSPORTER || authUser.agency === ROLES.GOD) && (
            <Nav.Link style={{paddingLeft: '30px'}} href={ROUTES.TRANSPORTER}>Transporter Home</Nav.Link>
        )}

        <SignOutButton />
    </Nav>
);

const NavigationNonAuth = () => (
    <Nav className="mr-auto">
        <Nav.Link href={ROUTES.LANDING}>Home</Nav.Link>
    </Nav>
);

export default MenuBar;