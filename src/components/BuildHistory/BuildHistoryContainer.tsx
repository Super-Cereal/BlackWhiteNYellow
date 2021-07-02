import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import BuildHistory from './BuildHistory';
import withTransparentBackground from '../_HOC/withTransparentBackground';
import { connectedStoreContainerProps } from './types';
import { popUpBoxContainerProps } from '../common/PopUpBox/types';

// @ts-ignore
import { settingsSS, buildHistorySS } from '../../redux/storeSelectors';
// @ts-ignore
import { axiosGetAllBuilds, clearBuildHistoryLoadInfo } from './redux/buildHistoryActions';

const BuildHistoryContainer: React.FC<popUpBoxContainerProps & connectedStoreContainerProps> = ({
  popUpAdditionalClass,
  togglePopUp,
  repoName,
  builds,
  loadInfo,
  axiosGetAllBuilds,
  clearBuildHistoryLoadInfo,
}) => {
  const [offset, setOffset] = React.useState(0);
  const onShowMore = () => setOffset(offset + 1);

  React.useEffect(() => {
    axiosGetAllBuilds(offset);
  }, [offset, axiosGetAllBuilds]);

  React.useEffect(() => clearBuildHistoryLoadInfo, [clearBuildHistoryLoadInfo]);

  return (
    <BuildHistory
      popUpAdditionalClass={popUpAdditionalClass}
      togglePopUp={togglePopUp}
      repoName={repoName}
      builds={builds}
      isFetching={loadInfo.isFetching}
      onShowMore={onShowMore}
    />
  );
};

// @ts-ignore
const mstp = (state) => ({
  repoName: settingsSS.repoInfo(state).repoName,
  builds: buildHistorySS.builds(state),
  loadInfo: buildHistorySS.loadInfo(state),
});

const odtp = {
  axiosGetAllBuilds,
  clearBuildHistoryLoadInfo,
};

export default compose(connect(mstp, odtp), withTransparentBackground)(BuildHistoryContainer);
