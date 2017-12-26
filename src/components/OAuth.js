import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../services/github-api';

class OAuth extends Component {
  constructor() {
    super();
    this.state = {
      access_token: null
    };
  }

  componentDidMount() {
    const code = window.location.href.split('=').slice(-1)[0];
    if (code) {
      API.getToken(code).then(access_token => this.setState({ access_token }));
    }
  }

  render() {
    return this.state.access_token ? <Redirect to="/" /> : 'REDIRECTING...';
  }
}

export default OAuth;
