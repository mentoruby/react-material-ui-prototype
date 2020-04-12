import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/Home";
import Dashboard from "./component/Dashboard";
import History from './component/History';

class Routes extends Component {
  render() {
      return (
          <Router history={History}>
              <Switch>
                 <Route path="/" exact component={Login} />
                 <Route path="/home" exact component={Home} />
                 <Route path="/dashboard" exact component={Dashboard} />
              </Switch>
          </Router>
      )
  }
}

export default Routes;