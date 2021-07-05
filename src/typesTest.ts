import { RenderResult, RenderOptions } from '@testing-library/react';

type customSettingsType = {
  options?: RenderOptions;
  history?: any;
};

export type getAllTheProvidersType = (data?: customSettingsType) => React.FC;

export type customRenderType = (
  ui: React.ReactElement,
  data?: customSettingsType
) => RenderResult<typeof import('d:/Yandex/maGit/front/node_modules/@testing-library/dom/types/queries'), HTMLElement>;
