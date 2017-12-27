import React, { Component } from 'react';
import { connect } from 'react-redux';
import Repo from '../repo';

class ReposList extends Component {
  render() {
    console.log('render');

    const filterFunction = ({
      hasOpenIssues,
      hasTopics,
      starredGTXTimes,
      updatedAfter,
      type,
      lang
    }) => item => {
      return (
        (hasOpenIssues ? item.open_issues_count > 0 : true) &&
        (hasTopics ? item.topics.length > 0 : true) &&
        item.stargazers_count >= starredGTXTimes &&
        item.updated_at > updatedAfter &&
        (lang === 'Any' ? true : item.language === lang) &&
        (type === 'fork'
          ? item.fork === true
          : type === 'source' ? item.fork === false : true)
      );
    };
    const { repos } = this.props;
    const filters = this.props.filters || {
      hasOpenIssues: false,
      hasTopics: false,
      starredGTXTimes: 0,
      updatedAfter: '2000-01-01',
      type: 'all',
      lang: 'Any'
    };
    const filteredRepos = repos.filter(filterFunction(filters));

    return (
      <div>
        {repos.length
          ? filteredRepos.map(repo => <Repo repo={repo} key={repo.id} />)
          : 'No repos yet!'}
      </div>
    );
  }
}

const mapStateToProps = ({ repos, filters }) => ({
  repos: repos.data.repos,
  filters
});

export { ReposList };
export default connect(mapStateToProps)(ReposList);
