import { SET_IS_FETCHING, NO_BUILD, SET_BUILD_DATA, SET_BUILD_LOGS } from './buildDetailsActions';

import Convert from 'ansi-to-html';
const convert = new Convert();

const defaultState = {
  noBuild: false,
  isFetching: true,
  build: {},
  logsText: '\u001b[40;97m No logs yet \u001b[0m',
};

function buildDetailsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_IS_FETCHING:
      return { ...state, isFetching: action.payload };
    case NO_BUILD:
      return { ...state, noBuild: true };
    case SET_BUILD_DATA:
      return { ...state, build: action.payload };
    case SET_BUILD_LOGS:
      return { ...state, logsText: convert.toHtml(action.payload) };
    default:
      return state;
  }
}

export default buildDetailsReducer;
