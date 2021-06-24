import instance from '../../redux/axiosInstance';

const buildHistoryDAL = {
  async axiosGetAllBuilds(offset) {
    const offsetParam = offset ? `offset=${8 * offset}` : '';
    const limitParam = 'limit=8';
    try {
      return await instance.get(`/builds?${offsetParam}&${limitParam}`).then((res) => res.data);
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
