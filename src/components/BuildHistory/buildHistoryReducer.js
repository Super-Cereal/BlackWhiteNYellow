import React from 'react';
import buildHistoryDAL from './buildHistoryDAL';

const SET_FETCHING = 'SET_FETCHING';
const SET_BUILDS = 'SET_BUILDS';

const defaultState = {
  isFetching: true,
  builds: [],
};

function buildHistoryReducer(state, action) {
  switch (action.type) {
    case SET_FETCHING:
      return { ...state, isFetching: action.payload };
    case SET_BUILDS:
      return { ...state, builds: [...state.builds, ...action.payload] };
    default:
      return state;
  }
}

export const useRequestForAllBuilds = (offset) => {
  const [state, dispatch] = React.useReducer(buildHistoryReducer, defaultState);

  React.useEffect(() => {
    const func = async () => {
      dispatch({ type: SET_FETCHING, payload: true });
      const builds = await buildHistoryDAL.axiosGetAllBuilds(offset);
      if (builds.status === 200) dispatch({ type: SET_BUILDS, payload: builds.data });
      dispatch({ type: SET_FETCHING, payload: false });
    };
    func();
  }, [offset]);

  return state;
};
