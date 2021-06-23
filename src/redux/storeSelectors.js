// SS - state selector
export const appIsInitializedSS = (state) => state.app.isInitialized;

export const settingsHaveSettingsSS = (state) => state.settings.haveSettings;

export const settingsIsRequestInProgressSS = (state) =>
  state.settings.isRequestInProgressSS;
