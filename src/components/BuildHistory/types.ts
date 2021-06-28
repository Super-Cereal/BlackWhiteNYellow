import { buildType } from '../BuildDetails/types';

export type buildHistoryProps = {
  repoName: string;
  builds: Array<buildType>;
  isFetching: boolean;
  onShowMore: React.MouseEventHandler<HTMLElement>;
};

export type connectedStoreContainerProps = {
  repoName: string;
};

export type popUpBoxBuildProps = {
  popUpAdditionalClass: string;
  togglePopUp: React.MouseEventHandler<HTMLElement>;
};
