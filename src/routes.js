import React from "react";
import { isAuthenticated } from "./service/auth";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Main from "./pages/Main";
import Profile from "./pages/Profile";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <PrivateRoute path="/profile" exact component={Profile} />
      </Switch>
    </Router>
  );
}
