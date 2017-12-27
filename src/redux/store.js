import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './modules';

const middleware = [thunk];
const mainReducer = combineReducers({ ...reducers });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(mainReducer, enhancers);

window.store = store;

export default store;
