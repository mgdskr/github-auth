import React, { Fragment } from 'react';
import { compose, withHandlers } from 'recompose';
import API from '../services/github-api';

const login = () => () => {
  API.login();
};

const Login = ({ login }) => {
  return (
    <Fragment>
      You are not logged!
      <button onClick={login}>Log me in!</button>
    </Fragment>
  );
};

export default compose(withHandlers({ login }))(Login);
