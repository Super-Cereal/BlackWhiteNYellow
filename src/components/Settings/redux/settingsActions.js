import settingsDAL from './settingsDAL';

export const SET_SETTINGS = 'SET_SETTINGS';

const setSettings = ({ repoName, buildCommand, mainBranch, period }) => ({
  type: SET_SETTINGS,
  payload: { data: { repoName, buildCommand, mainBranch, period, haveSettings: true } },
});

export const axiosGetSettingsCreator =
  ({ settingsDAL, setSettings }) =>
  () =>
  async (dispatch) => {
    const settings = await settingsDAL.axiosGetSettings();
    if (settings.haveSettings) {
      const rN = settings.data.repoName.split('/');
      settings.data.repoName = rN[rN.length - 2] + '/' + rN[rN.length - 1];
      await dispatch(setSettings(settings.data));
    }
  };

export const axiosGetSettings = axiosGetSettingsCreator({ settingsDAL, setSettings });

export const axiosPostSettingsCreator =
  ({ settingsDAL, setSettings }) =>
  (data) =>
  async (dispatch) => {
    const response = await settingsDAL.axiosPostSettings({
      ...data,
      repoName: `https://github.com/${data.repoName}`,
    });
    if (response.status === 200) {
      await dispatch(setSettings(data));
    }
    return response;
  };

export const axiosPostSettings = axiosPostSettingsCreator({ settingsDAL, setSettings });
