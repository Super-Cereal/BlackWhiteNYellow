import React from 'react';
import StartScreen from './StartScreen';

import '@testing-library/jest-dom/extend-expect';
import { fireEvent } from '@testing-library/react';

import customRender, { createHistory } from './../../renderTest';

describe('testing StartScreen component', () => {
  it('кнопка в хедере переводит в настройки', () => {
    const history = createHistory();
    const application = <StartScreen />;
    const { getByTestId } = customRender(application, { history });

    history.push = jest.fn();
    fireEvent.click(getByTestId('StartScreen-HeaderLinkToSettings'));
    expect(history.push).toBeCalledWith('/settings');
  });
  it('кнопка в центре переводит в настройки', () => {
    const history = createHistory();
    const application = <StartScreen />;
    const { getByTestId } = customRender(application, { history });

    history.push = jest.fn();
    fireEvent.click(getByTestId('StartScreen-CentralLintToSettings'));
    expect(history.push).toBeCalledWith('/settings');
  });
});
