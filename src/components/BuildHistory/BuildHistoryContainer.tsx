import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import BuildHistory from './BuildHistory';
import withTransparentBackground from '../_HOC/withTransparentBackground';
import { popUpBoxContainerProps, connectedStoreContainerProps } from './types';

// @ts-ignore
import { settingsRepoInfoSS, buildHistoryBuildsSS } from '../../redux/storeSelectors';
// @ts-ignore
import { axiosGetAllBuilds } from '../../redux/buildHistory/buildHistoryActions';

const BuildHistoryContainer: React.FC<
  popUpBoxContainerProps & connectedStoreContainerProps
> = ({ popUpAdditionalClass, togglePopUp, repoName, axiosGetAllBuilds, builds }) => {
  React.useEffect(axiosGetAllBuilds, [axiosGetAllBuilds]);
  return (
    <BuildHistory
      popUpAdditionalClass={popUpAdditionalClass}
      togglePopUp={togglePopUp}
      repoName={repoName}
      builds={builds}
    />
  );
};

// @ts-ignore
const mstp = (state) => ({
  repoName: settingsRepoInfoSS(state).repoName,
  builds: buildHistoryBuildsSS(state),
});
// @ts-ignore
const odtp = {
  axiosGetAllBuilds,
};

export default compose(
  connect(mstp, odtp),
  withTransparentBackground
)(BuildHistoryContainer);
