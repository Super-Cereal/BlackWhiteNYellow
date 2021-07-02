import buildHistoryDAL from './buildHistoryDAL';

export const SET_FETCHING = 'buildHistory_SET_FETCHING';
export const SET_BUILDS = 'buildHistory_SET_BUILDS';
export const CLEAR = 'buildHistory_CLEAR';

export const axiosGetAllBuilds = (offset) => async (dispatch) => {
  dispatch({ type: SET_FETCHING, payload: true });
  const builds = await buildHistoryDAL.axiosGetAllBuilds(offset);
  if (builds.status === 200) dispatch({ type: SET_BUILDS, payload: builds.data });
  dispatch({ type: SET_FETCHING, payload: false });
};

export const clearBuildHistoryLoadInfo = () => CLEAR;
