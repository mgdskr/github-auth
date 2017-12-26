import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Login from './components/Login';
import OAuth from './components/OAuth';
import Home from './components/Home';
import API from './services/github-api';

const pathname = process.env.MODE === 'prod' ? '/github-auth' : '';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <RouteWithPath path="/login" component={Login} />
          <RouteWithPath path="/oauth" component={OAuth} />
          <PrivateRoute exact path="/" component={Home} />
        </Fragment>
      </Router>
    );
  }
}

const RouteWithPath = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    path={`${pathname}${path}`}
    render={props => <Component {...props} />}
  />
);

const PrivateRoute = ({ component: Component, path, ...rest }) => (
  <Route
    {...rest}
    path={`${pathname}${path}`}
    render={props =>
      API.hasToken() ? (
        <Component {...props} />
      ) : (
        <Redirect to={`${pathname}/login`} />
      )
    }
  />
);

export default App;
