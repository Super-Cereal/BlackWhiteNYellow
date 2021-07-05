import buildHistoryDAL from './buildHistoryDAL';

export const SET_FETCHING = 'buildHistory_SET_FETCHING';
export const SET_BUILDS = 'buildHistory_SET_BUILDS';
export const CLEAR = 'buildHistory_CLEAR';

export const setFetching = (isFetching) => ({ type: SET_FETCHING, payload: isFetching });
export const setBuilds = (builds) => ({ type: SET_BUILDS, payload: builds });

export const axiosGetAllBuildsCreator =
  ({ buildHistoryDAL, setFetching, setBuilds }) =>
  (offset) =>
  async (dispatch) => {
    dispatch(setFetching(true));
    const builds = await buildHistoryDAL.axiosGetAllBuilds(offset);
    if (builds.status === 200) dispatch(setBuilds(builds.data));
    dispatch(setFetching(false));
  };

export const axiosGetAllBuilds = axiosGetAllBuildsCreator({ buildHistoryDAL, setFetching, setBuilds });

export const clearBuildHistoryLoadInfo = () => CLEAR;
