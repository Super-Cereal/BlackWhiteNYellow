import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import BuildHistory from './BuildHistory';
import withTransparentBackground from '../_HOC/withTransparentBackground';
import { connectedStoreContainerProps } from './types';
import { popUpBoxContainerProps } from '../common/PopUpBox/types';

// @ts-ignore
import { settingsSS } from '../../redux/storeSelectors';
// @ts-ignore
import { useRequestForAllBuilds } from './buildHistoryReducer';

const BuildHistoryContainer: React.FC<popUpBoxContainerProps & connectedStoreContainerProps> = ({
  popUpAdditionalClass,
  togglePopUp,
  repoName,
}) => {
  const [offset, setOffset] = React.useState(0);
  const onShowMore = () => setOffset(offset + 1);
  const allBuilds = useRequestForAllBuilds(offset);
  return (
    <BuildHistory
      popUpAdditionalClass={popUpAdditionalClass}
      togglePopUp={togglePopUp}
      repoName={repoName}
      builds={allBuilds.builds}
      isFetching={allBuilds.isFetching}
      onShowMore={onShowMore}
    />
  );
};

// @ts-ignore
const mstp = (state) => ({
  repoName: settingsSS.repoInfo(state).repoName,
});

export default compose(connect(mstp), withTransparentBackground)(BuildHistoryContainer);
