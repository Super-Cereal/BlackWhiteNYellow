import instance from '../../axios/axiosInstance';

const buildHistoryDAL = {
  async axiosGetAllBuilds(offset) {
    const offsetParam = offset ? `offset=${8 * offset}` : '';
    const limitParam = 'limit=8';
    return await instance.get(`/builds?${offsetParam}&${limitParam}`).then((res) => res.data);
  },
};

export default buildHistoryDAL;
