import React, { Component, Fragment } from 'react';
import Header from './header';
import ReposList from './repos-list';
import InnerContainer from './inner-container';
import Filters from './filters';
import Sorting from './sorting';
import Dialog from './dialog';
import { connect } from 'react-redux';
import { loadMore as loadNextPage } from '../redux/modules/repos';

class Home extends Component {
  loadMore = () => {
    loadNextPage(this.props.dispatch)(this.props.query, this.props.nextPage);
  };

  render() {
    console.log('props', this.props);
    const { allPagesLoaded } = this.props;

    return (
      <Fragment>
        <Header />
        <InnerContainer>
          <Sorting />
          <Filters />
          <ReposList />
          {!allPagesLoaded ? (
            <button type="button" onClick={this.loadMore}>
              Load more
            </button>
          ) : null}
        </InnerContainer>
        <Dialog />
      </Fragment>
    );
  }
}

const mapStateToProps = ({ repos: { nextPage, allPagesLoaded, query } }) => ({
  nextPage,
  allPagesLoaded,
  query
});

export { Home };
export default connect(mapStateToProps)(Home);
