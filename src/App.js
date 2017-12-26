import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Login from './components/Login';
import OAuth from './components/OAuth';
import Home from './components/Home';
import API from './services/github-api';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route path="/github-auth/login" component={Login} />
          <Route path="/github-auth/oauth" component={OAuth} />
          <PrivateRoute exact path="/github-auth/" component={Home} />
        </Fragment>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      API.hasToken() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/github-auth/login" />
      )
    }
  />
);

export default App;
