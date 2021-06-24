import instance from '../axiosInstance.js';

const buildHistoryDAL = {
  async axiosGetAllBuilds({ offset, limit }) {
    const offsetParam = offset ? `offset=${offset}` : '';
    const limitParam = limit ? `limit=${limit}` : '';
    try {
      return await instance
        .get(`/builds?${offsetParam}&${limitParam}`)
        .then((res) => res.data);
    } catch (e) {
      throw Error(e);
    }
  },
  async axiosStartNewBuild(commitHash) {
    try {
      return await instance.post(`/builds/${commitHash}`).then((res) => res.data);
    } catch (e) {
      throw Error(e);
    }
  },
};

export default buildHistoryDAL;
