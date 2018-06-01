import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Components
import LandingPage from '../LandingPage/LandingPage';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import Settings from '../Settings/Settings';
import TeamPage from '../TeamPage/TeamPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/aboutus" component={TeamPage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/settings" component={Settings} />
            <Route path="/" component={LandingPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
