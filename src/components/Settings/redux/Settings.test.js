import { axiosGetSettingsCreator, axiosPostSettingsCreator } from './settingsActions';
import '@testing-library/jest-dom/extend-expect';

describe('BuildDetails axiosGetBuildDetails', () => {
  let settingsDAL = {
    axiosGetSettings: jest.fn(),
  };
  const setSettings = jest.fn();
  const dispatchStub = jest.fn();
  beforeEach(() => {
    settingsDAL = {
      axiosGetSettings: jest.fn(() => {}),
    };
  });
  afterEach(() => {
    setSettings.mockClear();
  });
  it('происходят запросы к апи за настройками', async () => {
    settingsDAL.axiosGetSettings.mockReturnValue({ haveSettings: false, data: { repoName: '1/2' } });
    const axiosGetSettings = axiosGetSettingsCreator({
      settingsDAL,
      setSettings,
    })();
    await axiosGetSettings(dispatchStub);
    expect(settingsDAL.axiosGetSettings).toHaveBeenCalledTimes(1);
  });
  it('если настройки не пришли, то ничего не диспачится', async () => {
    settingsDAL.axiosGetSettings.mockReturnValue({ haveSettings: false, data: { repoName: '1/2' } });
    const axiosGetBuildDetails = axiosGetSettingsCreator({
      settingsDAL,
      setSettings,
    })();
    await axiosGetBuildDetails(dispatchStub);
    expect(setSettings).toHaveBeenCalledTimes(0);
  });
  it('если настройки пришли, то они диспачатся', async () => {
    const dumbData = { repoName: '1/2', buildCommand: 'npm build', mainBranch: 'master', period: 1000 };
    settingsDAL.axiosGetSettings.mockReturnValue({
      haveSettings: true,
      data: dumbData,
    });
    const axiosGetSettings = axiosGetSettingsCreator({
      settingsDAL,
      setSettings,
    })();
    await axiosGetSettings(dispatchStub);
    expect(setSettings).toHaveBeenCalledWith(dumbData);
  });
});

describe('BuildDetails axiosPostSettings', () => {
  let settingsDAL = {
    axiosPostSettings: jest.fn(),
  };
  const setSettings = jest.fn();
  const dispatchStub = jest.fn();
  const dumbSettingsData = {
    repoName: 'super/project',
    buildCommand: 'npm build',
    mainBranch: 'main',
    period: 15000,
  };
  beforeEach(() => {
    settingsDAL = {
      axiosPostSettings: jest.fn(() => {}),
    };
  });
  afterEach(() => {
    setSettings.mockClear();
  });
  it('настройки отправляются предварительно обработав repoName', async () => {
    settingsDAL.axiosPostSettings.mockReturnValue({ status: 200, data: {} });
    const axiosPostSettings = axiosPostSettingsCreator({
      settingsDAL,
      setSettings,
    })(dumbSettingsData);
    await axiosPostSettings(dispatchStub);

    const expectedRequest = { ...dumbSettingsData, repoName: `https://github.com/${dumbSettingsData.repoName}` };
    expect(settingsDAL.axiosPostSettings).toHaveBeenCalledWith(expectedRequest);
  });
  it('если апи прислало статус 200, то настройки диспачнулись', async () => {
    settingsDAL.axiosPostSettings.mockReturnValue({ status: 200, data: {} });
    const axiosPostSettingsDetails = axiosPostSettingsCreator({
      settingsDAL,
      setSettings,
    })(dumbSettingsData);
    await axiosPostSettingsDetails(dispatchStub);
    expect(setSettings).toHaveBeenCalledWith(dumbSettingsData);
  });
  it('если апи не прислало статус 200, то настройки не диспачнулись', async () => {
    settingsDAL.axiosPostSettings.mockReturnValue({ status: 500, data: {} });
    const axiosPostSettingsDetails = axiosPostSettingsCreator({
      settingsDAL,
      setSettings,
    })(dumbSettingsData);
    await axiosPostSettingsDetails(dispatchStub);
    expect(setSettings).toHaveBeenCalledTimes(0);
  });
});
