import React from 'react';
import buildHistoryDAL from './buildHistoryDAL';

const defaultState = {
  isFetching: true,
  builds: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'setFetching':
      return { ...state, isFetching: action.payload };
    case 'setBuilds':
      return { ...state, builds: [...state.builds, ...action.payload] };
    default:
      return state;
  }
}

export const useRequestForAllBuilds = (offset) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  React.useEffect(() => {
    const func = async () => {
      dispatch({ type: 'setFetching', payload: true });
      const builds = await buildHistoryDAL.axiosGetAllBuilds(offset);
      if (builds.status === 200) dispatch({ type: 'setBuilds', payload: builds.data });
      dispatch({ type: 'setFetching', payload: false });
    };
    func();
  }, [offset]);

  return state;
};
