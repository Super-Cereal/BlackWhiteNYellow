import instance from '../../../axios/axiosInstance.js';

const buildDetailsDAL = {
  async axiosGetBuild(buildId) {
    return await instance.get(`/builds/${buildId}`).then((res) => res.data);
  },
  async axiosGetBuildLogs(buildId) {
    return await instance.get(`/builds/${buildId}/logs`).then((res) => res.data);
  },
  async axiosStartNewBuild(commitHash) {
    return await instance.post(`/builds/${commitHash}`).then((res) => res.data);
  },
};

export default buildDetailsDAL;
