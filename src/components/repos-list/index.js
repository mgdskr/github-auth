import React from 'react';
import Repo from '../repo';

const ReposList = ({ repos }) => (
  <div>{repos.map(repo => <Repo repo={repo} key={repo.id} />)}</div>
);

export default ReposList;
