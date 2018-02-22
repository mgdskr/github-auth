import React from 'react';
import { connect } from 'react-redux';
import { compose, defaultProps, withHandlers } from 'recompose';
import { createSelector } from 'reselect';
import Repo from '../repo';
import { filterFunction, sortingFunction } from '../../libs/utils';
import { dialogGetData, dialogOpen } from '../../redux/modules/dialog';

const _defaultProps = {
  filters: {
    hasOpenIssues: false,
    hasTopics: false,
    starredGTXTimes: 0,
    updatedAfter: '2000-01-01',
    type: 'all',
    lang: 'Any'
  },
  sortingObj: {
    sortingField: 'full_name',
    sortingOrder: 'asc'
  }
};

const handlerOnOpenDialog = ({
  cachedData,
  filteredRepos,
  dialogGetData,
  dialogOpen
}) => repoId => () => {
  if (cachedData.map(({ id }) => id).includes(repoId)) {
    return dialogOpen(repoId);
  }

  dialogGetData(filteredRepos.find(({ id }) => id === repoId));
};

const ReposList = ({ filteredRepos, handlerOnOpenDialog }) => {
  return (
    <div>
      {filteredRepos.length
        ? filteredRepos.map(repo => (
            <Repo
              repo={repo}
              key={repo.id}
              handlerOnOpenDialog={handlerOnOpenDialog}
            />
          ))
        : 'No repos yet!'}
    </div>
  );
};

const enhance = compose(
  defaultProps(_defaultProps),
  withHandlers({ handlerOnOpenDialog })
);

const enhancedReposList = enhance(ReposList);

const repos = ({ repos: { repos } }) => repos;
const filters = ({ filters }) => filters;
const sortingObj = ({ sort }) => sort;
const cachedData = ({ dialog: { data } }) => data;

const selector = createSelector(
  repos,
  filters,
  sortingObj,
  cachedData,
  (repos, filters, sortingObj, cachedData) => {
    const filteredRepos = repos
      .filter(filterFunction(filters))
      .sort(sortingFunction(sortingObj));

    return { filteredRepos, cachedData };
  }
);

const mapDispatchToProps = dispatch => ({
  dialogGetData: dialogGetData(dispatch),
  dialogOpen: dialogOpen(dispatch)
});

export { enhancedReposList };
export default connect(selector, mapDispatchToProps)(enhancedReposList);
