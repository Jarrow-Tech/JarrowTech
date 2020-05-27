import React from 'react';
import './../../App.css';
import { withRouter } from 'react-router-dom';

class MenuBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <h1>Menu Bar</h1>
        )
    }
}

export default withRouter(MenuBar);