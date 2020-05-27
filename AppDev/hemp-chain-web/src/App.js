import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import Regulator from "./pages/Regulator/Regulator";
import ContractOverview from "./pages/ContractDetails/ContractOverview";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

export default function App() {
  return (
    <Router>
      <div>
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
              <Link to="/timer">Timer</Link>
            </li>
          </ul>
        </nav>
        {/* Route switching. This needs to go from most specific and then
            cascade down to least specific. The first path that matches
            is where it will route */}
        <Switch>
          <Route path="/regulator/details/:uid/:address" component={ContractOverview} />
          <Route path="/regulator" component={Regulator} />
          <Route path="/timer" component={Timer} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

function Home() {
  return(
    <h1>You're on the home page</h1>
  )
}


function Timer() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>The current time is {currentTime}.</p>
      </header>
    </div>
  );
}