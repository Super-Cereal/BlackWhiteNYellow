// SS - state selectors
export const appSS = {
  isInitialized: (state) => state.app.isInitialized,
};

export const settingsSS = {
  haveSettings: (state) => state.settings.haveSettings,
  repoInfo: (state) => {
    const set = state.settings;
    return {
      repoName: set.repoName,
      period: set.period,
      mainBranch: set.mainBranch,
      buildCommand: set.buildCommand,
    };
  },
};

export const buildDetailsSS = {
  buildInfo: (state) => ({
    ...state.buildDetails.build,
    logsText: state.buildDetails.logsText,
  }),
  loadInfo: (state) => ({
    noBuild: state.buildDetails.noBuild,
    isFetching: state.buildDetails.isFetching,
  }),
};
