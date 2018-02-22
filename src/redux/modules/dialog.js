import API from '../../services/github-api';

const DIALOG_OPEN = 'DIALOG_OPEN';
const DIALOG_GET_DATA = 'DIALOG_GET_DATA';
const DIALOG_GET_DATA_SUCCESS = 'DIALOG_GET_DATA_SUCCESS';
const DIALOG_GET_DATA_FAILED = 'DIALOG_GET_DATA_FAILED';
const DIALOG_CLOSE = 'DIALOG_CLOSE';

const dialogOpen = dispatch => repoId => {
  dispatch({ type: DIALOG_OPEN, repoId });
};

const dialogGetData = dispatch => selectedRepo => {
  const {
    languages_url,
    contributors_url,
    url,
    fork = null,
    id
  } = selectedRepo;
  dispatch({ type: DIALOG_GET_DATA, repoId: id });

  const URLs = [
    languages_url,
    contributors_url,
    url + '/pulls?sort=popularity&per_page=5'
  ];

  if (fork) URLs.push(fork);

  API.getDialogData(URLs)
    .then(([languages = {}, contributors = [], pulls = [], forkURL = null]) => {
      const data = { languages, contributors, pulls, forkURL, id };
      dispatch(dialogGetDataSuccess(data, id));
    })
    .catch(error => dispatch(dialogGetDataFailed(error)));
};

const dialogGetDataSuccess = (data, repoId) => ({
  type: DIALOG_GET_DATA_SUCCESS,
  data,
  repoId
});

const dialogGetDataFailed = error => ({ type: DIALOG_GET_DATA_FAILED, error });

const dialogClose = dispatch => dispatch({ type: DIALOG_CLOSE });

const initialState = {
  isDialogOpen: false,
  dataIsFetching: false,
  dataIsFetched: false,
  repoId: null,
  data: [],
  error: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case DIALOG_OPEN:
      return {
        ...state,
        isDialogOpen: true,
        repoId: action.repoId
      };
    case DIALOG_GET_DATA:
      return {
        ...state,
        dataIsFetching: true,
        dataIsFetched: false,
        repoId: action.repoId
      };
    case DIALOG_GET_DATA_SUCCESS:
      return {
        ...state,
        dataIsFetching: false,
        dataIsFetched: true,
        isDialogOpen: true,
        data: [...state.data, action.data],
        repoId: action.repoId,
        error: ''
      };
    case DIALOG_GET_DATA_FAILED:
      return {
        ...state,
        dataIsFetching: false,
        dataIsFetched: false,
        repoId: null,
        error: action.error
      };
    case DIALOG_CLOSE:
      return {
        ...state,
        isDialogOpen: false
      };
    default:
      return { ...state };
  }
}

export {
  dialogOpen,
  dialogGetData,
  dialogGetDataSuccess,
  dialogGetDataFailed,
  dialogClose
};
