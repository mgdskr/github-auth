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
    .then(({ items, total_count }) => {
      dispatch(getReposSuccess(items, total_count));
    })
    .catch(error => {
      console.log(error);
      dispatch(getReposFailed(error));
    });
};

const getReposSuccess = (repos, totalCount) => ({
  type: GET_REPOS_SUCCESS,
  repos,
  totalCount
});

const getReposFailed = error => ({
  type: GET_REPOS_FAILED,
  error
});

const loadMore = dispatch => (query, nextPage) => {
  API.loadPage(query, nextPage)
    .then(({ items: repos, total_count: totalCount }) => {
      console.log(repos, totalCount);
      dispatch(getReposSuccess(repos, totalCount));
    })
    .catch(error => {
      console.log(error);
      dispatch(getReposFailed(error));
    });
};

const initialState = {
  query: '',
  isDataFetching: false,
  isDataFetched: false,
  error: null,
  repos: [],
  languages: ['Any'],
  totalCount: 0,
  nextPage: 1
};

export default function reducer(state = initialState, action) {
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
      const reposLanguages = action.repos.reduce((acc, item) => {
        if (item.language === null || acc.includes(item.language)) {
          return acc;
        }
        return acc.concat(item.language);
      }, []);
      const languages = ['Any', ...Array.from(new Set(reposLanguages))];
      const nextPage = state.nextPage + 1;
      const allPagesLoaded = action.totalCount - nextPage * 30 < 0;

      return {
        ...state,
        isDataFetching: false,
        isDataFetched: true,
        repos: [...state.repos, ...action.repos],
        totalCount: action.totalCount,
        languages,
        nextPage,
        allPagesLoaded,
        error: null
      };
    }
    case GET_REPOS_FAILED:
      return {
        ...initialState,
        error: action.error
      };
    default:
      return { ...state };
  }
}

export { getRepos, getReposSuccess, getReposFailed, loadMore };
