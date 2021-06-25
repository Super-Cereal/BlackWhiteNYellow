import instance from '../../axios/axiosInstance';

const settingsDAL = {
  async axiosGetSettings() {
    try {
      return await instance.get('/settings').then((res) => res.data);
    } catch (e) {
      throw Error(e);
    }
  },
  async axiosPostSettings(data) {
    try {
      return await instance.post('/settings', data).then((res) => res.data);
    } catch (e) {
      throw Error(e);
    }
  },
  async checkIfRepoAvailable(repoName) {
    try {
      await instance.get(repoName, {
        withCredentials: false,
        baseURL: 'https://api.github.com/repos/',
      });
      return true;
    } catch (e) {
      if (e.response.status === 403) return true;
      return false;
    }
  },
  async checkIfBranchAvailable(repoName, branchName) {
    try {
      await instance.get(branchName, {
        withCredentials: false,
        baseURL: `https://api.github.com/repos/${repoName}/branches/`,
      });
      return true;
    } catch (e) {
      if (e.response.status === 403) return true;
      return false;
    }
  },
};

export default settingsDAL;
