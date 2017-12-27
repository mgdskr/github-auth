import API from '../../services/github-api';

const AUTH = 'AUTH';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_FAILED = 'AUTH_FAILED';

const auth = dispatch => {
  dispatch({
    type: AUTH
  });

  const code = window.location.href.split('=').slice(-1)[0];
  if (code) {
    API.getToken(code)
      .then(access_token => {
        dispatch(authSuccess(access_token));
      })
      .catch(error => dispatch(authFailed(error)));
  }
};

const authSuccess = access_token => ({
  type: AUTH_SUCCESS,
  access_token
});

const authFailed = error => ({
  type: AUTH_FAILED,
  error
});

export default function reducer(state, action) {
  switch (action.type) {
    case AUTH:
      return {
        ...state,
        isRequestingToken: true,
        isAuthorized: false,
        error: null,
        access_token: null
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isRequestingToken: false,
        isAuthorized: true,
        error: null,
        access_token: action.access_token
      };
    case AUTH_FAILED:
      return {
        ...state,
        isRequestingToken: false,
        isAuthorized: false,
        error: action.error,
        access_token: null
      };
    default:
      return { ...state };
  }
}

export { auth, authSuccess, authFailed };
