import settingsDAL from './settingsDAL';

export const SET_SETTINGS = 'SET_SETTINGS';

const setSettings = ({ repoName, buildCommand, mainBranch, period }) => ({
  type: SET_SETTINGS,
  payload: { data: { repoName, buildCommand, mainBranch, period, haveSettings: true } },
});

export const axiosGetSettings = () => async (dispatch) => {
  const settings = await settingsDAL.axiosGetSettings();
  if (settings.haveSettings) {
    await dispatch(setSettings(settings));
  }
};

export const axiosPostSettings = (data) => async (dispatch) => {
  const response = await settingsDAL.axiosPostSettings({
    ...data,
    repoName: `https://github.com/${data.repoName}`,
  });
  debugger;
  if (response.status === 200) {
    await dispatch(setSettings(data));
  }
};
