import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../redux/modules/auth';

class OAuth extends Component {
  static propTypes = {
    isAuthorized: PropTypes.bool
  };

  componentDidMount() {
    auth(this.props.dispatch);
  }

  render() {
    return this.props.isAuthorized ? <Redirect to="/" /> : 'REDIRECTING...';
  }
}

const mapStateToProps = ({ auth: { isAuthorized } }) => ({ isAuthorized });

export { OAuth };
export default connect(mapStateToProps)(OAuth);
