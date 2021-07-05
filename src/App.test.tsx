import React from 'react';
import App from './App';

import customRender from './renderTest';
// import { screen } from '@testing-library/react';

describe('testing App component', () => {
  it('если приложение не инициализировано возвращает лоадер', () => {
    const application = <App isInitialized={false} initializeApp={() => {}} haveSettings={false} />;
    const { getByTestId } = customRender(application);

    getByTestId('AppNotInitLoader');
  });
  it('если приложение инициализировано и нет настроек возвращает StartScreen', () => {
    const application = <App isInitialized={true} initializeApp={() => {}} haveSettings={false} />;
    const { getByTestId } = customRender(application);

    getByTestId('StartScreen');
  });
  it('если приложение инициализировано и настройки есть возвращает BuildHistory', () => {
    const application = <App isInitialized={true} initializeApp={() => {}} haveSettings={true} />;
    const { getByTestId } = customRender(application);

    getByTestId('BuildHistory');
  });
});
