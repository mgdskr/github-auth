import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import Header from './header';
import ReposList from './repos-list';
import InnerContainer from './inner-container';
import Filters from './filters';
import Sorting from './sorting';
import Dialog from './dialog';
import { loadMore as loadNextPage } from '../redux/modules/repos';

const loadMore = ({ dispatch, query, nextPage }) => () => {
  loadNextPage(dispatch)(query, nextPage);
};

const Home = ({ allPagesLoaded, loadMore }) => {
  return (
    <Fragment>
      <Header />
      <InnerContainer>
        <Sorting />
        <Filters />
        <ReposList />
        {!allPagesLoaded && (
          <button type="button" onClick={loadMore}>
            Load more
          </button>
        )}
      </InnerContainer>
      <Dialog />
    </Fragment>
  );
};

const enhance = compose(withHandlers({ loadMore }));

const enhancedHome = enhance(Home);

const mapStateToProps = ({ repos: { nextPage, allPagesLoaded, query } }) => ({
  nextPage,
  allPagesLoaded,
  query
});

export { enhancedHome };
export default connect(mapStateToProps)(enhancedHome);
