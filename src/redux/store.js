import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { typeToAction } from './middlewares';

import appReducer from './app/appReducer';
import settingsReducer from './settings/settingsReducer';
import buildHistoryReducer from './buildHistory/buildHistoryReducer';

let reducers = combineReducers({
  app: appReducer,
  settings: settingsReducer,
  buildHistory: buildHistoryReducer,
});

// чтобы использовать расширение redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducers, composeEnhancers(applyMiddleware(typeToAction, ThunkMiddleware)));

export default store;
