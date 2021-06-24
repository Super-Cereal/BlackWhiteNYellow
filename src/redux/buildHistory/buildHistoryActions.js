import buildHistoryDAL from './buildHistoryDAL';

export const SET_BUILDS = 'SET_BUILDS';

const setBuilds = (builds) => ({
  type: SET_BUILDS,
  payload: { builds },
});

export const axiosGetAllBuilds = (params) => async (dispatch) => {
  const { offset, limit } = params ?? {};
  const builds = await buildHistoryDAL.axiosGetAllBuilds({ offset, limit });
  if (builds.status === 200) {
    dispatch(setBuilds(builds.data));
  }
};

export const axiosStartNewBuild = (commitHash) => async (dispatch) => {
  const response = await buildHistoryDAL.axiosStartNewBuild(commitHash);
  return response;
};
