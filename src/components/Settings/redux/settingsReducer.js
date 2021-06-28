import { SET_SETTINGS } from './settingsActions';

const defaultState = {
  haveSettings: false,
  repoName: null,
  buildCommand: null,
  mainBranch: null,
  period: null,
};

const settingsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_SETTINGS:
      return { ...state, ...action.payload.data };
    default:
      return state;
  }
};

export default settingsReducer;
