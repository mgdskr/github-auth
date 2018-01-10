const CLIENT_ID = 'e7af846e6c298a44e092';
const LOGIN_API = 'https://github.com';
const HOST_API = 'https://api.github.com';

let token = window.localStorage.ACCESS_TOKEN || '';

const API = {
  fetchWithToken(url) {
    if (!token) return Promise.resolve([]);
    const headers = new Headers();
    headers.set('Accept', 'application/vnd.github.mercy-preview+json');

    return fetch(`${url}&access_token=${token}`, { headers }).then(response =>
      response.json()
    );
  },
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
    return this.fetchWithToken(`${HOST_API}/search/repositories?q=${query}`);
  },
  hasToken() {
    return !!token;
  },
  loadPage(query, page) {
    return this.fetchWithToken(
      `${HOST_API}/search/repositories?q=${query}&page=${page}`
    );
  },
  getDialogData(URLs) {
    const promises = URLs.map(URL => this.fetchWithToken(`${URL}?`));
    return Promise.all(promises);
  }
};

export default API;
