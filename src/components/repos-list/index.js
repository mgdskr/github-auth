import React from 'react';
import { connect } from 'react-redux';
import { compose, defaultProps, withHandlers } from 'recompose';
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
  repos,
  dialogGetData,
  dialogOpen
}) => repoId => () => {
  if (cachedData.map(({ id }) => id).includes(repoId)) {
    return dialogOpen(repoId);
  }

  dialogGetData(repos.find(({ id }) => id === repoId));
};

const ReposList = ({ repos, filters, sortingObj, handlerOnOpenDialog }) => {
  const filteredRepos = repos
    .filter(filterFunction(filters))
    .sort(sortingFunction(sortingObj));

  return (
    <div>
      {repos.length
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

const mapStateToProps = ({
  repos: { repos },
  filters,
  sort: sortingObj,
  dialog: { data: cachedData }
}) => ({
  repos,
  filters,
  sortingObj,
  cachedData
});

const mapDispatchToProps = dispatch => ({
  dialogGetData: dialogGetData(dispatch),
  dialogOpen: dialogOpen(dispatch)
});

export { enhancedReposList };
export default connect(mapStateToProps, mapDispatchToProps)(enhancedReposList);
