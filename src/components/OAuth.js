import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, setStatic, lifecycle } from 'recompose';
import { auth } from '../redux/modules/auth';

const propTypes = {
  isAuthorized: PropTypes.bool
};

function componentDidMount() {
  auth(this.props.dispatch);
}

const OAuth = ({ isAuthorized }) => {
  return isAuthorized ? <Redirect to="/" /> : 'REDIRECTING...';
};

const enhance = compose(
  setStatic('propTypes', propTypes),
  lifecycle({ componentDidMount })
);

const enhancedOAuth = enhance(OAuth);

const mapStateToProps = ({ auth: { isAuthorized } }) => ({ isAuthorized });

export { enhancedOAuth };
export default connect(mapStateToProps)(enhancedOAuth);
