import instance from './axiosInstance';

const startNewBuild = async (commitHash) => {
  return await instance.post(`/builds/${commitHash}`).then((res) => res.data);
};

export default startNewBuild;
