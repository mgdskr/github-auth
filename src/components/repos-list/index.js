import React, { Component } from 'react';
import { connect } from 'react-redux';
import Repo from '../repo';
import { filterFunction, sortingFunction } from '../../libs/utils';
import { dialogGetData, dialogOpen } from '../../redux/modules/dialog';

class ReposList extends Component {
  static defaultProps = {
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

  handlerOnOpenDialog = repoId => () => {
    const { cachedData, repos, dialogGetData, dialogOpen } = this.props;

    if (cachedData.map(({ id }) => id).includes(repoId)) {
      return dialogOpen(repoId);
    }

    dialogGetData(repos.find(({ id }) => id === repoId));
  };

  render() {
    const { repos, filters, sortingObj } = this.props;
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
                handlerOnOpenDialog={this.handlerOnOpenDialog}
              />
            ))
          : 'No repos yet!'}
      </div>
    );
  }
}

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

export { ReposList };
export default connect(mapStateToProps, mapDispatchToProps)(ReposList);
