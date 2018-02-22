import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './redux/store';

const AppWithRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<AppWithRedux />, document.getElementById('root'));
