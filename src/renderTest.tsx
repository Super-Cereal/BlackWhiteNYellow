import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
// @ts-ignore
import initStore from './redux/store';

import { getAllTheProvidersType, customRenderType } from './typesTest';

export const createHistory = () =>
  createMemoryHistory({
    initialEntries: ['/', '/settings', '/build/:buildId'],
    initialIndex: 0,
  });

const AllTheProviders: React.FC<{ history: any }> = ({ history, children }) => {
  history = history ?? createHistory()
  const store = initStore();
  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

const getAllTheProviders: getAllTheProvidersType = (data) => {
  return ({ children }) => <AllTheProviders history={data?.history}>{children}</AllTheProviders>;
};

const customRender: customRenderType = (ui, data) =>
  render(ui, { wrapper: getAllTheProviders(data), ...data?.options });

export default customRender;
