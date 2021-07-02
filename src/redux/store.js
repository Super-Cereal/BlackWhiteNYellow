import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { typeToAction } from './middlewares';

import appReducer from './app/appReducer';
import settingsReducer from '../components/Settings/redux/settingsReducer';
import buildDetailsReducer from '../components/BuildDetails/redux/buildDetailsReducer';
import buildHistoryReducer from './../components/BuildHistory/redux/buildHistoryReducer';

let reducers = combineReducers({
  app: appReducer,
  settings: settingsReducer,
  buildDetails: buildDetailsReducer,
  buildHistory: buildHistoryReducer
});

// чтобы использовать расширение redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducers, composeEnhancers(applyMiddleware(typeToAction, ThunkMiddleware)));

export default store;
