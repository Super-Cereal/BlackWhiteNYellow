import { INITIALIZE_APP_SUCCESS } from './appActions';

const defaultState = {
  isInitialized: false
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case INITIALIZE_APP_SUCCESS:
      return {...state, isInitialized: true};
    default:
      return state;
  }
};

export default appReducer;
