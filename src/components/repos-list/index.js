import React, { Component } from 'react';
import { connect } from 'react-redux';
import Repo from '../repo';
import { filterFunction, sortingFunction } from '../../libs/utils';

class ReposList extends Component {
  render() {
    const { repos } = this.props;
    const filters = this.props.filters || {
      hasOpenIssues: false,
      hasTopics: false,
      starredGTXTimes: 0,
      updatedAfter: '2000-01-01',
      type: 'all',
      lang: 'Any'
    };
    const sortingObj = this.props.sortingObj || {
      sortingField: 'full_name',
      sortingOrder: 'asc'
    };
    const filteredRepos = repos
      .filter(filterFunction(filters))
      .sort(sortingFunction(sortingObj));

    return (
      <div>
        {repos.length
          ? filteredRepos.map(repo => <Repo repo={repo} key={repo.id} />)
          : 'No repos yet!'}
      </div>
    );
  }
}

const mapStateToProps = ({ repos: { repos }, filters, sort: sortingObj }) => ({
  repos,
  filters,
  sortingObj
});

export { ReposList };
export default connect(mapStateToProps)(ReposList);
