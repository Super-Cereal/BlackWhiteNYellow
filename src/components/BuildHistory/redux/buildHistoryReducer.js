import { SET_FETCHING, SET_BUILDS, CLEAR } from './buildHistoryActions.js';

const defaultState = {
  isFetching: true,
  builds: [],
};

function buildHistoryReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_FETCHING:
      return { ...state, isFetching: action.payload };
    case SET_BUILDS:
      return { ...state, builds: [...state.builds, ...action.payload] };
    case CLEAR:
      return { ...state, builds: [], isFetching: true };
    default:
      return state;
  }
}

export default buildHistoryReducer;
