import { SET_BUILDS } from './buildHistoryActions';

const defaultState = {
  builds: [],
};

const buildHistoryReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_BUILDS:
      return { ...state, builds: action.payload.builds };
    default:
      return state;
  }
};

export default buildHistoryReducer;
