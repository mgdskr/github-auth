import React, { Component, Fragment } from 'react';
import Header from './header';
import ReposList from './repos-list';
import InnerContainer from './inner-container';
import Filters from './filters';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <InnerContainer>
          <Filters />
          <ReposList />
        </InnerContainer>
      </Fragment>
    );
  }
}

export default Home;
