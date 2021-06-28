import React from 'react';
import buildDetailsDAL from './buildDetailsDAL';

import Convert from 'ansi-to-html';
const convert = new Convert();

const defaultState = {
  noBuild: false,
  isFetching: true,
  build: {},
  logsText: '\u001b[40;97m No logs yet \u001b[0m',
};

function reducer(state, action) {
  switch (action.type) {
    case 'setIsFetching':
      return { ...state, isFetching: action.payload };
    case 'noBuild':
      return { ...state, noBuild: true };
    case 'setBuildData':
      return { ...state, build: action.payload };
    case 'setBuildLogs':
      return { ...state, logsText: convert.toHtml(action.payload) };
    default:
      return state;
  }
}

export const useRequestForBuildDetails = (buildId) => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  React.useEffect(() => {
    dispatch({ type: 'setIsFetching', payload: true });
    Promise.all([buildDetailsDAL.axiosGetBuild(buildId), buildDetailsDAL.axiosGetBuildLogs(buildId)]).then(
      ([build, logs]) => {
        if (build.status === 200) {
          dispatch({ type: 'setBuildData', payload: build.data });
          dispatch({
            type: 'setBuildLogs',
            payload: logs.status === 200 && logs.data !== '' ? logs.data : '\u001b[40;97m No logs yet \u001b[0m',
          });
        } else {
          dispatch({ type: 'noBuild' });
        }
        dispatch({ type: 'setIsFetching', payload: false });
      }
    );
  }, [buildId]);

  return state;
};
