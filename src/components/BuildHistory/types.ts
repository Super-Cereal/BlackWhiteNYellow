import { buildType } from '../BuildDetails/types';

export type buildHistoryProps = {
  repoName: string;
  builds: Array<buildType>;
  isFetching: boolean;
  onShowMore: React.MouseEventHandler<HTMLElement>;
};

export type connectedStoreContainerProps = {
  repoName: string;
  builds: Array<buildType>;
  loadInfo: { isFetching: boolean };
  axiosGetAllBuilds: (offset: number) => void;
  clearBuildHistoryLoadInfo: () => any;
};
