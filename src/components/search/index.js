import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRepos } from '../../redux/modules/repos';
import './style.css';

class Search extends Component {
  handleOnSearch = event => {
    event.preventDefault();
    const $input = event.target.querySelector('#searchInput');
    const query = $input.value;
    $input.value = '';
    getRepos(this.props.dispatch)(query);
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
export default connect()(Search);
