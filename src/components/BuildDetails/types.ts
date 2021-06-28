export type buildType = {
  buildNumber: number;
  status: 'Success' | 'Failed' | 'Waiting';
  commitMessage: string;
  branchName: string;
  commitHash: string;
  authorName: string;
  logsText: string;
  start: string;
  duration: number;
  id: string;
};

export type connectedStoreContainerProps = {
  repoName: string;
  buildDetails: {
    build: buildType;
    loadInfo: {
      noBuild: boolean;
      isFetching: boolean;
    };
  };
  axiosGetBuildDetails: (buildId: string) => void;
};

export type useParamsType = { buildId: string };

export type buildProps = {
  repoName: string;
  build: buildType;
  rebuild: {
    onRebuild: any;
    isRebuildInProgress: boolean;
  };
};
