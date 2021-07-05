import { axiosGetBuildDetailsCreator, axiosStartNewBuildCreator } from './buildDetailsActions';
import '@testing-library/jest-dom/extend-expect';

describe('BuildDetails axiosGetBuildDetails', () => {
  const dumbBuildData = {
    buildNumber: 1,
    status: 'Success',
    commitMessage: 'string',
    branchName: 'string',
    commitHash: 'string',
    authorName: 'string',
    start: '18:04:15T2021-04-02',
    duration: 1024,
    logsText: 'string',
    id: 'string',
  };
  let buildDetailsDAL = {
    axiosGetBuild: jest.fn(() => {}),
    axiosGetBuildLogs: jest.fn(() => {}),
  };
  const setFetching = jest.fn(),
    setBuildData = jest.fn(),
    setBuildLogs = jest.fn((logs) => logs),
    noBuild = jest.fn(),
    dispatchStub = jest.fn();
  beforeEach(() => {
    buildDetailsDAL = {
      axiosGetBuild: jest.fn(() => ({ status: 200, data: dumbBuildData })),
      axiosGetBuildLogs: jest.fn(() => ({ status: 200, data: '' })),
    };
  });
  afterEach(() => {
    setFetching.mockClear();
    setBuildData.mockClear();
    setBuildLogs.mockClear();
    noBuild.mockClear();
  });
  it('происходят запросы к апи с переданным buildId', async () => {
    const buildId = 1;
    const axiosGetBuildDetails = axiosGetBuildDetailsCreator({
      buildDetailsDAL,
      setFetching,
      setBuildData,
      setBuildLogs,
      noBuild,
    })(buildId);
    await axiosGetBuildDetails(dispatchStub);
    expect(buildDetailsDAL.axiosGetBuild).toHaveBeenCalledWith(buildId);
    expect(buildDetailsDAL.axiosGetBuildLogs).toHaveBeenCalledWith(buildId);
  });
  it('корректный билд от апи => данные билда корректно диспачатся', async () => {
    const axiosGetBuildDetails = axiosGetBuildDetailsCreator({
      buildDetailsDAL,
      setFetching,
      setBuildData,
      setBuildLogs,
      noBuild,
    })(1);
    await axiosGetBuildDetails(dispatchStub);
    expect(setBuildData).toHaveBeenCalledWith(dumbBuildData);
    expect(noBuild).toHaveBeenCalledTimes(0);
  });
  it('некорректный билд от апи => диспачится отсутсвие билда', async () => {
    buildDetailsDAL.axiosGetBuild = jest.fn(() => ({ status: 500, data: {} }));
    const axiosGetBuildDetails = axiosGetBuildDetailsCreator({
      buildDetailsDAL,
      setFetching,
      setBuildData,
      setBuildLogs,
      noBuild,
    })(1);
    await axiosGetBuildDetails(dispatchStub);
    expect(setBuildData).toHaveBeenCalledTimes(0);
    expect(setBuildLogs).toHaveBeenCalledTimes(0);
    expect(noBuild).toHaveBeenCalledTimes(1);
  });
  it('корректный билд от апи + некорректные логи => логи диспачатся с дефолтным значением', async () => {
    buildDetailsDAL.axiosGetBuildLogs = jest.fn(() => ({ status: 500, data: {} }));
    const axiosGetBuildDetails = axiosGetBuildDetailsCreator({
      buildDetailsDAL,
      setFetching,
      setBuildData,
      setBuildLogs,
      noBuild,
    })(1);
    await axiosGetBuildDetails(dispatchStub);
    expect(setBuildLogs).toHaveBeenCalledWith('\u001b[40;97m No logs yet \u001b[0m');
  });
  it('корректный билд от апи + нулевые логи => логи диспачатся с дефолтным значением', async () => {
    buildDetailsDAL.axiosGetBuildLogs = jest.fn(() => ({ status: 200, data: '' }));
    const axiosGetBuildDetails = axiosGetBuildDetailsCreator({
      buildDetailsDAL,
      setFetching,
      setBuildData,
      setBuildLogs,
      noBuild,
    })(1);
    await axiosGetBuildDetails(dispatchStub);
    expect(setBuildLogs).toHaveBeenCalledWith('\u001b[40;97m No logs yet \u001b[0m');
  });
  it('корректный билд от апи + ненулевые логи => логи диспачатся с пришедшим значением', async () => {
    buildDetailsDAL.axiosGetBuildLogs = jest.fn(() => ({ status: 200, data: 'its correct build logs' }));
    const axiosGetBuildDetails = axiosGetBuildDetailsCreator({
      buildDetailsDAL,
      setFetching,
      setBuildData,
      setBuildLogs,
      noBuild,
    })(1);
    await axiosGetBuildDetails(dispatchStub);
    expect(setBuildLogs).toHaveBeenCalledWith('its correct build logs');
  });
});

describe('BuildDetails axiosStartNewBuild', () => {
  const buildDetailsDAL = { axiosStartNewBuild: jest.fn() };
  const setRebuilding = jest.fn();
  const dispatchStub = jest.fn();
  afterEach(() => {
    setRebuilding.mockClear();
  });
  it('происходит запрос к апи с переданным commitHash', async () => {
    const commitHash = 'e123xas';
    buildDetailsDAL.axiosStartNewBuild.mockReturnValue({ status: 200, build: {} });
    const axiosStartNewBuild = axiosStartNewBuildCreator({
      buildDetailsDAL,
      setRebuilding,
    })(commitHash);
    await axiosStartNewBuild(dispatchStub);
    expect(buildDetailsDAL.axiosStartNewBuild).toHaveBeenCalledWith(commitHash);
  });
});
