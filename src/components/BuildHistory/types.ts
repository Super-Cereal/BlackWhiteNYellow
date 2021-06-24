import { EffectCallback } from 'react';

import { buildType } from '../BuildDetails/types';

export type buildHistoryProps = {
  repoName: string;
  builds: Array<buildType>;
};

export type popUpBoxContainerProps = {
  popUpAdditionalClass: string;
  togglePopUp: React.MouseEventHandler<HTMLElement>;
  axiosStartNewBuild: (commitHash: string) => { status: number; data: any };
};

export type connectedStoreContainerProps = {
  repoName: string;
  axiosGetAllBuilds: EffectCallback;
  builds: Array<buildType>;
};

export type popUpBoxBuildProps = {
  popUpAdditionalClass: string;
  togglePopUp: React.MouseEventHandler<HTMLElement>;
};
