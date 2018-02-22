import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose, setStatic, withHandlers } from 'recompose';
import { getRepos } from '../../redux/modules/repos';
import './style.css';

const propTypes = {
  getRepos: PropTypes.func,
  handleOnSearch: PropTypes.func
};

const handleOnSearch = ({ getRepos }) => event => {
  event.preventDefault();
  const $input = event.target.querySelector('#searchInput');
  const query = $input.value;
  $input.value = '';
  getRepos(query);
};

const Search = ({ handleOnSearch }) => {
  return (
    <form action="" onSubmit={handleOnSearch}>
      <input id="searchInput" type="search" placeholder="Search GitHub" />
      <button type="submit">Search</button>
    </form>
  );
};

const enhance = compose(
  setStatic('propTypes', propTypes),
  withHandlers({ handleOnSearch })
);

const enhancedSearch = enhance(Search);

export { enhancedSearch };
export default connect(null, dispatch => ({ getRepos: getRepos(dispatch) }))(
  enhancedSearch
);
