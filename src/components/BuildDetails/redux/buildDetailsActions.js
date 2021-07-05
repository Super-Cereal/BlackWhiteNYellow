import buildDetailsDAL from './buildDetailsDAL';

export const SET_FETCHING = 'buildDetails_SET_FETCHING';
export const SET_REBUILDING = 'buildDetails_SET_REBUILDING';
export const SET_BUILD_DATA = 'buildDetails_SET_BUILD_DATA';
export const SET_BUILD_LOGS = 'buildDetails_SET_BUILD_LOGS';
export const NO_BUILD = 'buildDetails_NO_BUILD';
export const CLEAR = 'buildDetails_CLEAR';

export const setBuildData = (buildData) => ({ type: SET_BUILD_DATA, payload: buildData });
export const setBuildLogs = (logs) => ({ type: SET_BUILD_LOGS, payload: logs });
export const setFetching = (isFetching) => ({ type: SET_FETCHING, payload: isFetching });
export const setRebuilding = (isRebuilding) => ({ type: SET_REBUILDING, payload: isRebuilding });
export const noBuild = () => NO_BUILD;
export const clearBuildDetailsLoadInfo = () => CLEAR;

export const axiosGetBuildDetailsCreator =
  ({ buildDetailsDAL, setFetching, setBuildData, setBuildLogs, noBuild }) =>
  (buildId) =>
  async (dispatch) => {
    dispatch(setFetching(true));
    const [build, logs] = await Promise.all([
      buildDetailsDAL.axiosGetBuild(buildId),
      buildDetailsDAL.axiosGetBuildLogs(buildId),
    ]);

    if (build.status === 200) {
      dispatch(setBuildData(build.data));
      dispatch(
        setBuildLogs(logs.status === 200 && logs.data !== '' ? logs.data : '\u001b[40;97m No logs yet \u001b[0m')
      );
    } else {
      dispatch(noBuild());
    }
    dispatch(setFetching(false));
  };

export const axiosGetBuildDetails = axiosGetBuildDetailsCreator({
  buildDetailsDAL,
  setFetching,
  setBuildData,
  setBuildLogs,
  noBuild,
});

export const axiosStartNewBuildCreator =
  ({ buildDetailsDAL, setRebuilding }) =>
  (commitHash) =>
  async (dispatch) => {
    dispatch(setRebuilding(true));
    const { status, data: build } = await buildDetailsDAL.axiosStartNewBuild(commitHash);
    dispatch(setRebuilding(false));
    return { status, build };
  };

export const axiosStartNewBuild = axiosStartNewBuildCreator({ buildDetailsDAL, setRebuilding });
