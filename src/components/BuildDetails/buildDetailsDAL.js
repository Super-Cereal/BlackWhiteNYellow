import instance from '../../axios/axiosInstance.js';

const buildHistoryDAL = {
  async axiosGetBuild(buildId) {
    try {
      return await instance.get(`/builds/${buildId}`).then((res) => res.data);
    } catch (e) {
      throw Error(e);
    }
  },
  async axiosGetBuildLogs(buildId) {
    try {
      return await instance.get(`/builds/${buildId}/logs`).then((res) => res.data);
    } catch (e) {
      throw Error(e);
    }
  },
};

export default buildHistoryDAL;
