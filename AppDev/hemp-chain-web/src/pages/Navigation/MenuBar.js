import React from 'react';
import './../../App.css';
import { withRouter, Link } from 'react-router-dom';

class MenuBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <nav>
                <ul>
                    {/* The display */}
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
                </ul>
            </nav>
        )
    }
}

export default withRouter(MenuBar);