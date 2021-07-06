// @ts-nocheck
import React from 'react';
import '@testing-library/jest-dom/extend-expect';

import { SettingsFormContainer } from './SettingsForm';
import customRender from './../../renderTest';

import { fireEvent, act } from '@testing-library/react';

describe('testing BuildDetails container component', () => {
  let repoInfo;
  beforeEach(() => {
    repoInfo = {
      period: 20,
      mainBranch: 'nanny',
      buildCommand: 'npm build',
      repoName: 'super/project',
    };
  });
  const axiosPostSettings = jest.fn();
  afterEach(() => {
    axiosPostSettings.mockClear();
  });
  it('если есть настройки то они подставляются в форму', () => {
    const application = <SettingsFormContainer repoInfo={repoInfo} axiosPostSettings={axiosPostSettings} />;

    const { getByTestId } = customRender(application);
    expect(getByTestId('formRepoName').value).toBe(repoInfo.repoName);
    expect(getByTestId('formBuildCommand').value).toBe(repoInfo.buildCommand);
    expect(getByTestId('formMainBranch').value).toBe(repoInfo.mainBranch);
    expect(getByTestId('formPeriod').value).toBe(String(repoInfo.period));
  });
  it('если настройки пустые то задаются дефолтные значения', () => {
    repoInfo.period = undefined;
    repoInfo.mainBranch = undefined;
    repoInfo.buildCommand = undefined;
    repoInfo.repoName = undefined;

    const application = <SettingsFormContainer repoInfo={repoInfo} axiosPostSettings={axiosPostSettings} />;

    const { getByTestId } = customRender(application);
    expect(getByTestId('formRepoName').value).toBe('');
    expect(getByTestId('formBuildCommand').value).toBe('');
    expect(getByTestId('formMainBranch').value).toBe('master');
    expect(getByTestId('formPeriod').value).toBe('10');
  });
  it('у текстовых полей есть кнопка очищения', () => {
    const application = <SettingsFormContainer repoInfo={repoInfo} axiosPostSettings={axiosPostSettings} />;

    const { getByTestId } = customRender(application);
    getByTestId('formRepoName-clearButton');
    getByTestId('formBuildCommand-clearButton');
    getByTestId('formMainBranch-clearButton');
  });
  it('у числовых полей нет кнопки очищения', () => {
    const application = <SettingsFormContainer repoInfo={repoInfo} axiosPostSettings={axiosPostSettings} />;

    const { queryByTestId } = customRender(application);
    expect(queryByTestId('formPeriod-clearButton')).toBeNull();
  });
  it('если кликнуть по кнопке очистить, то очищается нужное поле', async () => {
    const application = <SettingsFormContainer repoInfo={repoInfo} axiosPostSettings={axiosPostSettings} />;

    const { getByTestId } = customRender(application);
    await act(async () => {
      fireEvent.click(getByTestId('formRepoName-clearButton'));
    });
    expect(getByTestId('formRepoName').value).toBe('');
    expect(getByTestId('formBuildCommand').value).toBe(repoInfo.buildCommand);
    expect(getByTestId('formMainBranch').value).toBe(repoInfo.mainBranch);
    expect(getByTestId('formPeriod').value).toBe(String(repoInfo.period));
  });
});
