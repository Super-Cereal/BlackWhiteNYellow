import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import BuildHistory from './BuildHistory';
import withTransparentBackground from '../_HOC/withTransparentBackground';
import { popUpBoxContainerProps, connectedStoreContainerProps } from './types';

// @ts-ignore
import { settingsRepoInfoSS } from '../../redux/storeSelectors';
// @ts-ignore
import { useRequestForAllBuilds } from './buildHistoryReducer';

const BuildHistoryContainer: React.FC<popUpBoxContainerProps & connectedStoreContainerProps> = ({
  popUpAdditionalClass,
  togglePopUp,
  repoName,
}) => {
  const [offset, setOffset] = React.useState(1);
  const onShowMore = () => setOffset(offset + 1);
  const state = useRequestForAllBuilds(offset);
  return (
    <BuildHistory
      popUpAdditionalClass={popUpAdditionalClass}
      togglePopUp={togglePopUp}
      repoName={repoName}
      builds={state.builds}
      isFetching={state.isFetching}
      onShowMore={onShowMore}
    />
  );
};

// @ts-ignore
const mstp = (state) => ({
  repoName: settingsRepoInfoSS(state).repoName,
});

export default compose(connect(mstp), withTransparentBackground)(BuildHistoryContainer);
