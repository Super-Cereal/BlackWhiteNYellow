import instance from './axiosInstance';

const startNewBuild = async (commitHash) => {
  try {
    return await instance.post(`/builds/${commitHash}`).then((res) => res.data);
  } catch (e) {
    throw Error(e);
  }
};

export default startNewBuild;
