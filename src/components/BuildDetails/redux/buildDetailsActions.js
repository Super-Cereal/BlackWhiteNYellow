import buildDetailsDAL from './buildDetailsDAL';

export const SET_FETCHING = 'buildDetails_SET_FETCHING';
export const SET_BUILD_DATA = 'buildDetails_SET_BUILD_DATA';
export const SET_BUILD_LOGS = 'buildDetails_SET_BUILD_LOGS';
export const NO_BUILD = 'buildDetails_NO_BUILD';
export const CLEAR = 'buildDetails_CLEAR';

export const axiosGetBuildDetails = (buildId) => async (dispatch) => {
  dispatch({ type: SET_FETCHING, payload: true });
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
  dispatch({ type: SET_FETCHING, payload: false });
};

export const clearBuildDetailsLoadInfo = () => CLEAR;
