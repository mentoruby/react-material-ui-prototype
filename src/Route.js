import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Login from "./component/Login";
import History from './component/History';
import MenuUtil from './util/MenuUtil';

class Routes extends Component {
  renderMenuItemRoute(item) {
    return (
        <Route key={item.name} path={item.href} exact component={item.component} />
    )
  }

  render() {
      return (
          <Router history={History}>
              <Switch>
                 <Route path="/" exact component={Login} />
                 {MenuUtil.MenuItems.map(item => { return this.renderMenuItemRoute(item); })}
              </Switch>
          </Router>
      )
  }
}

export default Routes;

// TODO: Check Authentication and Redirect to Login
// const AuthRoute = ({
//     component: Component,
//     isAuthenticated,
//     isLoading,
//     ...rest
//   }) => (
//     <Route
//       {...rest}
//       render={props =>
//         isAuthenticated && !isLoading ? (
//           <Component {...props} />
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: props.location }
//             }}
//           />
//         )
//       }
//     />
//   )