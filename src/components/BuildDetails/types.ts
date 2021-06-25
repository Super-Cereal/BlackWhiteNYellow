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
};

export type useParamsType = { buildId: string };

export type buildProps = {
  logsText: string;
  repoName: string;
  build: buildType;
  onRebuild: any;
  isRequestInProgress: boolean;
};
