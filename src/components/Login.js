import React, { Component, Fragment } from 'react';
import API from '../services/github-api';

class Login extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
  }

  login() {
    API.login();
  }

  render() {
    return (
      <Fragment>
        You are not logged!
        <button onClick={this.login}>Log me in!</button>
      </Fragment>
    );
  }
}

export default Login;
