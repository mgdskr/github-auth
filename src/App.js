import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Login from './components/Login';
import OAuth from './components/OAuth';
import Home from './components/Home';
import API from './services/github-api';

const pathname = process.env.PUBLIC_URL || '';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <RouteWithPath path="/login" component={Login} />
          <RouteWithPath path="/oauth" component={OAuth} />
          <RouteWithPath exact path="/test" component={TestExact} />
          <RouteWithPath path="/path" component={TestNOTExact} />
          <PrivateRoute exact path="/" component={Home} />
        </Fragment>
      </Router>
    );
  }
}

const TestExact = () => <h1>Exact Path</h1>;
const TestNOTExact = () => <h1>NOT Exact Path</h1>;

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
