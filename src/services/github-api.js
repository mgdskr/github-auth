const CLIENT_ID = 'e7af846e6c298a44e092';
const LOGIN_API = 'https://github.com';
const HOST_API = 'https://api.github.com';

let token = window.localStorage.ACCESS_TOKEN || '';

const API = {
  login() {
    window.location.replace(
      `${LOGIN_API}/login/oauth/authorize/?client_id=${CLIENT_ID}`
    );
  },
  getToken(code) {
    return fetch(`http://localhost:3000/users?code=${code}`)
      .then(res => res.json())
      .then(({ access_token }) => {
        token = access_token;
        window.localStorage.ACCESS_TOKEN = access_token;
        return access_token;
      });
  },
  searchRepos(query) {
    if (!token) return Promise.resolve([]);

    return fetch(
      `${HOST_API}/search/repositories?q=${query}&access_token=${token}`
    ).then(response => response.json());
  },
  hasToken() {
    return !!token;
  }
};

export default API;
