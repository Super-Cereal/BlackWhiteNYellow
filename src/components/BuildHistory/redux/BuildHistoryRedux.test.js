import { axiosGetAllBuildsCreator } from './buildHistoryActions';
import '@testing-library/jest-dom/extend-expect';

describe('BuildHistory axiosGetAllBuilds', () => {
  let buildHistoryDAL = {
    axiosGetAllBuilds: jest.fn(),
  };
  const setFetching = jest.fn(),
    setBuilds = jest.fn(),
    dispatchStub = jest.fn();
  beforeEach(() => {
    buildHistoryDAL = {
      axiosGetAllBuilds: jest.fn().mockReturnValue({ status: 200, data: [1, 2, 3] }),
    };
  });
  afterEach(() => {
    setFetching.mockClear();
    setBuilds.mockClear();
  });
  it('происходит запрос к апи за билдами', async () => {
    const offset = 16;
    const axiosGetAllBuilds = axiosGetAllBuildsCreator({
      buildHistoryDAL,
      setFetching,
      setBuilds,
    })(offset);
    await axiosGetAllBuilds(dispatchStub);
    expect(buildHistoryDAL.axiosGetAllBuilds).toHaveBeenCalledWith(offset);
  });
  it('билды пришли со статусом 200 => билды диспачатся', async () => {
    const offset = 16;
    const axiosGetAllBuilds = axiosGetAllBuildsCreator({
      buildHistoryDAL,
      setFetching,
      setBuilds,
    })(offset);
    await axiosGetAllBuilds(dispatchStub);
    expect(setBuilds).toHaveBeenCalledWith([1, 2, 3]);
  });
  it('билды пришли не со статусом 200 => билды не диспачатся', async () => {
    const offset = 16;
    buildHistoryDAL.axiosGetAllBuilds.mockReturnValue({ status: 500, data: [1, 2, 3] });
    const axiosGetAllBuilds = axiosGetAllBuildsCreator({
      buildHistoryDAL,
      setFetching,
      setBuilds,
    })(offset);
    await axiosGetAllBuilds(dispatchStub);
    expect(setBuilds).toHaveBeenCalledTimes(0);
  });
});
