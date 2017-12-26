import React, { Component, Fragment } from 'react';
import API from '../services/github-api';
import Header from './header';
import ReposList from './repos-list';
import InnerContainer from './inner-container';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      access_token: null,
      repos: []
    };
  }

  handleOnSearch = query => {
    API.searchRepos(query).then(({ items }) => {
      console.log(items);
      this.setState({ repos: items });
    });
  };

  render() {
    return (
      <Fragment>
        <Header onSearch={this.handleOnSearch} />
        <InnerContainer>
          {this.state.repos.length ? (
            <ReposList repos={this.state.repos} />
          ) : (
            'No repos yet'
          )}
        </InnerContainer>
      </Fragment>
    );
  }
}

export default Home;
