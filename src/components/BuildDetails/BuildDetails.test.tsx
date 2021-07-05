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
  it('после рендера делается запрос на получение билдов', () => {
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

    const application = <BuildDetails repoName="" build={buildData} rebuild={{}} />;
    const { getByTestId } = customRender(application, { history });

    history.push = jest.fn();
    fireEvent.click(getByTestId('BuildDetails-HeaderLinkToSettings'));
    expect(history.push).toBeCalledWith('/settings');
  });
});
