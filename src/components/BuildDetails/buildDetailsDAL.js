import instance from '../../axios/axiosInstance.js';

const buildHistoryDAL = {
  async axiosGetBuild(buildId) {
    return await instance.get(`/builds/${buildId}`).then((res) => res.data);
  },
  async axiosGetBuildLogs(buildId) {
    return await instance.get(`/builds/${buildId}/logs`).then((res) => res.data);
  },
};

export default buildHistoryDAL;
