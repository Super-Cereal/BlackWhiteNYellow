export type buildType = {
  buildNumber: number;
  status: 'Success' | 'Failed' | 'Waiting';
  commitMessage: string;
  branchName: string;
  commitHash: string;
  authorName: string;
  start: string;
  duration: number;
  id: string;
};

export type connectedStoreContainerProps = {
  repoName: string;
  logsText: string;
  clearBuildInfo: () => void;
  isLoadingInProgress: boolean;
  noBuild: boolean;
  build: buildType;
  axiosGetBuildInfo: (buildId: string) => void;
};

export type useParamsType = { buildId: string };

export type buildProps = {
  logsText: string;
  repoName: string;
  build: buildType;
};
