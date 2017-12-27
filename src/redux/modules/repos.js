import API from '../../services/github-api';

const GET_REPOS = 'GET_REPOS';
const GET_REPOS_SUCCESS = 'GET_REPOS_SUCCESS';
const GET_REPOS_FAILED = 'GET_REPOS_FAILED';

const getRepos = dispatch => query => {
  dispatch({
    type: GET_REPOS,
    query
  });

  API.searchRepos(query)
    .then(({ items }) => {
      dispatch(getReposSuccess({ repos: items }));
    })
    .catch(error => {
      console.log(error);
      dispatch(getReposFailed(error));
    });
};

const getReposSuccess = data => ({
  type: GET_REPOS_SUCCESS,
  data
});

const getReposFailed = error => ({
  type: GET_REPOS_FAILED,
  error
});

const initialData = { repos: [] };

export default function reducer(
  state = {
    data: initialData,
    languages: ['Any']
  },
  action
) {
  switch (action.type) {
    case GET_REPOS:
      return {
        ...state,
        query: action.query,
        isDataFetching: true,
        isDataFetched: false,
        error: null
      };
    case GET_REPOS_SUCCESS: {
      const reposLanguages = action.data.repos.reduce((acc, item) => {
        if (item.language === null || acc.includes(item.language)) {
          return acc;
        }
        return acc.concat(item.language);
      }, []);
      const languages = ['Any', ...Array.from(new Set(reposLanguages))];

      return {
        ...state,
        isDataFetching: false,
        isDataFetched: true,
        data: action.data,
        languages,
        error: null
      };
    }
    case GET_REPOS_FAILED:
      return {
        ...state,
        isDataFetching: false,
        isDataFetched: false,
        data: initialData,
        languages: ['Any'],
        error: action.error
      };
    default:
      return { ...state };
  }
}

export { getRepos, getReposSuccess, getReposFailed };
