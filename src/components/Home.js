import React, { Component, Fragment } from 'react';
import Header from './header';
import ReposList from './repos-list';
import InnerContainer from './inner-container';
import Filters from './filters';
import Sorting from './sorting';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <InnerContainer>
          <Sorting />
          <Filters />
          <ReposList />
        </InnerContainer>
      </Fragment>
    );
  }
}

export default Home;
