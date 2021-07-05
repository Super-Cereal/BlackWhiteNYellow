// @ts-nocheck
import React from 'react';
import BuildHistory from './BuildHistory';
import { BuildHistoryContainer } from './BuildHistoryContainer';

import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';

import customRender, { createHistory } from './../../renderTest';

describe('testing BuildHistory container component', () => {
  const axiosGetAllBuilds = jest.fn(),
    clearBuildHistoryLoadInfo = jest.fn();
  afterEach(() => {
    axiosGetAllBuilds.mockClear();
    clearBuildHistoryLoadInfo.mockClear();
  });
  it('после рендера делается запрос на получение всех билдов', () => {
    const builds = [];
    const loadInfo = { isFetching: false };
    const application = (
      <BuildHistoryContainer
        repoName=""
        builds={builds}
        loadInfo={loadInfo}
        axiosGetAllBuilds={axiosGetAllBuilds}
        clearBuildHistoryLoadInfo={clearBuildHistoryLoadInfo}
      />
    );
    customRender(application);
    expect(axiosGetAllBuilds).toHaveBeenCalledTimes(1);
  });
  it('после ухода со страницы происходит сброс useEffect', () => {
    const builds = [];
    const loadInfo = { isFetching: false };
    const application = (
      <BuildHistoryContainer
        repoName=""
        builds={builds}
        loadInfo={loadInfo}
        axiosGetAllBuilds={axiosGetAllBuilds}
        clearBuildHistoryLoadInfo={clearBuildHistoryLoadInfo}
      />
    );

    const { unmount } = customRender(application);
    expect(clearBuildHistoryLoadInfo).toHaveBeenCalledTimes(0);
    unmount();
    expect(clearBuildHistoryLoadInfo).toHaveBeenCalledTimes(1);
  });
  it('при нажатии на кнопку showMore делается запрос за новыми(т.е. с увеличенным offset) билдами', () => {
    const builds = [];
    const loadInfo = { isFetching: false };
    const application = (
      <BuildHistoryContainer
        repoName=""
        builds={builds}
        loadInfo={loadInfo}
        axiosGetAllBuilds={axiosGetAllBuilds}
        clearBuildHistoryLoadInfo={clearBuildHistoryLoadInfo}
      />
    );
    const defaultOffset = 0;
    const { getByTestId } = customRender(application);
    expect(axiosGetAllBuilds).toHaveBeenCalledTimes(1);
    expect(axiosGetAllBuilds).toHaveBeenCalledWith(defaultOffset);
    fireEvent.click(getByTestId('showMoreButton'));
    expect(axiosGetAllBuilds).toHaveBeenCalledTimes(2);
    expect(axiosGetAllBuilds).toHaveBeenCalledWith(defaultOffset + 1);
  });
});

describe('testing BuildDetails view component', () => {
  it('клик по карточке билда переводит на страницу с его логами', () => {
    const builds = [
      {
        buildNumber: 1,
        status: 'Success',
        commitMessage: 'string',
        branchName: 'string',
        commitHash: 'string',
        authorName: 'string',
        logsText: 'string',
        id: 'string',
      },
    ];
    const history = createHistory();

    const application = <BuildHistory repoName="" builds={builds} onShowMore={jest.fn()} isFetching={false} />;
    const { getByTestId } = customRender(application, { history });

    history.push = jest.fn();
    fireEvent.click(getByTestId('linkToBuildDetails'));
    expect(history.push).toBeCalledWith(`/build/${builds[0].id}`);
  });
  it('попап появляется после клика на кнопку run build', () => {
    const application = <BuildHistory repoName="" builds={[]} onShowMore={jest.fn()} isFetching={false} />;
    const { getByTestId, queryByTestId } = customRender(application);

    expect(queryByTestId('PopUpBox')).toBeNull();
    fireEvent.click(getByTestId('BuildHistory-runBuildButton'));
    getByTestId('PopUpBox');
  });
  it('попап уходит после клика на затемненный экран', () => {
    const application = <BuildHistory repoName="" builds={[]} onShowMore={jest.fn()} isFetching={false} />;
    const { getByTestId, queryByTestId } = customRender(application);

    fireEvent.click(getByTestId('BuildHistory-runBuildButton'));
    fireEvent.click(getByTestId('PopUpBox-BlackBackground'));
    expect(queryByTestId('PopUpBox')).toBeNull();
  });
  it('попап уходит после клика на кнопку отмены', () => {
    const application = <BuildHistory repoName="" builds={[]} onShowMore={jest.fn()} isFetching={false} />;
    const { getByTestId, queryByTestId } = customRender(application);

    fireEvent.click(getByTestId('BuildHistory-runBuildButton'));
    fireEvent.click(getByTestId('PopUpBox-cancelButton'));
    expect(queryByTestId('PopUpBox')).toBeNull();
  });
});
