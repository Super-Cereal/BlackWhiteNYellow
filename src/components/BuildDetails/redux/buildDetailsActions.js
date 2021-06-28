import buildDetailsDAL from './buildDetailsDAL';

export const SET_IS_FETCHING = 'SET_IS_FETCHING';
export const SET_BUILD_DATA = 'SET_BUILD_DATA';
export const SET_BUILD_LOGS = 'SET_BUILD_LOGS';
export const NO_BUILD = 'NO_BUILD';
export const CLEAR = 'CLEAR';

export const axiosGetBuildDetails = (buildId) => async (dispatch) => {
  dispatch({ type: SET_IS_FETCHING, payload: true });
  const [build, logs] = await Promise.all([
    buildDetailsDAL.axiosGetBuild(buildId),
    buildDetailsDAL.axiosGetBuildLogs(buildId),
  ]);

  if (build.status === 200) {
    dispatch({ type: SET_BUILD_DATA, payload: build.data });
    dispatch({
      type: SET_BUILD_LOGS,
      payload: logs.status === 200 && logs.data !== '' ? logs.data : '\u001b[40;97m No logs yet \u001b[0m',
    });
  } else {
    dispatch(NO_BUILD);
  }
  dispatch({ type: SET_IS_FETCHING, payload: false });
};

export const clearBuildDetailsLoadInfo = () => CLEAR;
