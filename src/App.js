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
          <Route path="/login" component={Login} />
          <Route path="/oauth" component={OAuth} />
          <PrivateRoute exact path="/" component={Home} />
        </Fragment>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      API.hasToken() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default App;
