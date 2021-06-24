// SS - state selector
export const appIsInitializedSS = (state) => state.app.isInitialized;

export const settingsHaveSettingsSS = (state) => state.settings.haveSettings;

export const settingsRepoInfoSS = (state) => {
  const set = state.settings;
  return {
    repoName: set.repoName,
    period: set.period,
    mainBranch: set.mainBranch,
    buildCommand: set.buildCommand,
  };
};

export const buildHistoryBuildsSS = (state) => state.buildHistory.builds;
