import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRepos } from '../../redux/modules/repos';
import './style.css';

class Search extends Component {
  static propTypes = {
    getRepos: PropTypes.func,
    handleOnSearch: PropTypes.func
  };

  handleOnSearch = event => {
    event.preventDefault();
    const $input = event.target.querySelector('#searchInput');
    const query = $input.value;
    $input.value = '';
    this.props.getRepos(query);
  };

  render() {
    return (
      <form action="" onSubmit={this.handleOnSearch}>
        <input id="searchInput" type="search" placeholder="Search GitHub" />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export { Search };
export default connect(null, dispatch => ({ getRepos: getRepos(dispatch) }))(
  Search
);
