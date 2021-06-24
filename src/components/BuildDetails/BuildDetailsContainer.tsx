import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import BuildDetails from './BuildDetails';
import { connectedStoreContainerProps, useParamsType } from './types';

// @ts-ignore
import { settingsRepoInfoSS } from '../../redux/storeSelectors';
// @ts-ignore
import { useRequestForBuildDetails } from './buildDetailsReducer';
// @ts-ignore
import { axiosStartNewBuild } from './../BuildHistory/buildHistoryReducer';

import Loader from '../common/Loader/Loader';
import PageNotFound from '../common/PageNotFound/PageNotFound';

const BuildDetailsContainer: React.FC<connectedStoreContainerProps> = ({ repoName, axiosStartNewBuild }) => {
  const { buildId } = useParams<useParamsType>();
  const stateReqBuildDetails = useRequestForBuildDetails(buildId);
  
  const history = useHistory();
  const [isRequestInProgress, setIsRequestInProgress] = React.useState(false);
  const onRebuild = async () => {
    setIsRequestInProgress(true);
    const { status, data: build } = await axiosStartNewBuild(stateReqBuildDetails.build.commitHash);
    setIsRequestInProgress(false);
    if (status !== 200) {
      throw build;
    } else {
      history.push(`/build/${build.id}`);
    }
  };
  return stateReqBuildDetails.isFetching ? (
    <div className="Page">
      <Loader />
    </div>
  ) : stateReqBuildDetails.noBuild ? (
    <PageNotFound />
  ) : (
    <BuildDetails
      onRebuild={onRebuild}
      isRequestInProgress={isRequestInProgress}
      repoName={repoName}
      logsText={stateReqBuildDetails.logsText}
      build={stateReqBuildDetails.build}
    />
  );
};

// @ts-ignore
const mstp = (state) => ({
  repoName: settingsRepoInfoSS(state).repoName,
});
// @ts-ignore
const odtp = ({
  axiosStartNewBuild
})
export default connect(mstp, odtp)(BuildDetailsContainer);
