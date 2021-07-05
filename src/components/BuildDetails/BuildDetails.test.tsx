// @ts-nocheck
import React from 'react';
import BuildDetails from './BuildDetails';
import { BuildDetailsContainer } from './BuildDetailsContainer';

import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';

import customRender, { createHistory } from './../../renderTest';

describe('testing BuildDetails container component', () => {
  let buildDetails;
  beforeEach(() => {
    buildDetails = {
      build: {
        buildNumber: 1,
        status: 'Success',
        commitMessage: 'string',
        branchName: 'string',
        commitHash: 'string',
        authorName: 'string',
        logsText: 'string',
        id: 'string',
      },
      loadInfo: {
        isFetching: false,
        noBuild: false,
      },
    };
  });
  const axiosGetBuildDetails = jest.fn();
  const clearBuildDetailsLoadInfo = jest.fn();
  afterEach(() => {
    axiosGetBuildDetails.mockClear();
    clearBuildDetailsLoadInfo.mockClear();
  });
  it('после рендера делается запрос на получение инфы и логов билда', () => {
    const application = (
      <BuildDetailsContainer
        repoName=""
        buildDetails={buildDetails}
        axiosGetBuildDetails={axiosGetBuildDetails}
        clearBuildDetailsLoadInfo={clearBuildDetailsLoadInfo}
      />
    );

    customRender(application);
    expect(axiosGetBuildDetails).toHaveBeenCalledTimes(1);
    expect(clearBuildDetailsLoadInfo).toHaveBeenCalledTimes(0);
  });
  it('после ухода со страницы происходит сброс useEffect', () => {
    const application = (
      <BuildDetailsContainer
        repoName=""
        buildDetails={buildDetails}
        axiosGetBuildDetails={axiosGetBuildDetails}
        clearBuildDetailsLoadInfo={clearBuildDetailsLoadInfo}
      />
    );

    const { unmount } = customRender(application);
    expect(clearBuildDetailsLoadInfo).toHaveBeenCalledTimes(0);
    unmount();
    expect(clearBuildDetailsLoadInfo).toHaveBeenCalledTimes(1);
  });
  it('если получение инфы в процессе, то отображается лоадер', () => {
    buildDetails.loadInfo.isFetching = true;
    const application = (
      <BuildDetailsContainer
        repoName=""
        buildDetails={buildDetails}
        axiosGetBuildDetails={axiosGetBuildDetails}
        clearBuildDetailsLoadInfo={clearBuildDetailsLoadInfo}
      />
    );

    const { getByTestId } = customRender(application);
    getByTestId('BuildDetailsLoading');
  });
  it('если билд не найден, то отображается 404', () => {
    buildDetails.loadInfo.noBuild = true;
    const application = (
      <BuildDetailsContainer
        repoName=""
        buildDetails={buildDetails}
        axiosGetBuildDetails={axiosGetBuildDetails}
        clearBuildDetailsLoadInfo={clearBuildDetailsLoadInfo}
      />
    );

    const { getByTestId } = customRender(application);
    getByTestId('page404');
  });
});

describe('testing BuildDetails view component', () => {
  let buildData = {
    buildNumber: 1,
    status: 'Success',
    commitMessage: 'string',
    branchName: 'string',
    commitHash: 'string',
    authorName: 'string',
    logsText: 'string',
    id: 'string',
  };

  it('кнопка в хедере переводит в настройки', () => {
    const history = createHistory();
    const rebuild = { isRebuildInProgress: false, onRebuild: () => {} };

    const application = <BuildDetails repoName="" build={buildData} rebuild={rebuild} />;
    const { getByTestId } = customRender(application, { history });

    history.push = jest.fn();
    fireEvent.click(getByTestId('BuildDetails-HeaderLinkToSettings'));
    expect(history.push).toBeCalledWith('/settings');
  });
  it('по нажатии кнопки rebuild вызывается функция из пропсов', () => {
    const rebuild = { isRebuildInProgress: false, onRebuild: jest.fn() };
    const application = <BuildDetails repoName="" build={buildData} rebuild={rebuild} />;
    const { getByTestId } = customRender(application);

    expect(rebuild.onRebuild).toHaveBeenCalledTimes(0);
    fireEvent.click(getByTestId('rebuildButton'));
    expect(rebuild.onRebuild).toHaveBeenCalledTimes(1);
  });
  it('если происходит запрос на rebuild, то кнопка становится недоступна', () => {
    const rebuild = { isRebuildInProgress: true, onRebuild: () => {} };
    const application = <BuildDetails repoName="" build={buildData} rebuild={rebuild} />;
    const { getByTestId } = customRender(application);

    const rebuildButton = getByTestId('rebuildButton');
    expect(rebuildButton.disabled).toBe(true);
  });
});
