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
import startNewBuild from '../../axios/startNewBuild';

import Loader from '../common/Loader/Loader';
import PageNotFound from '../common/PageNotFound/PageNotFound';

const BuildDetailsContainer: React.FC<connectedStoreContainerProps> = ({ repoName }) => {
  const { buildId } = useParams<useParamsType>();
  const buildDetails = useRequestForBuildDetails(buildId);

  const history = useHistory();
  const [isRequestInProgress, setIsRequestInProgress] = React.useState(false);
  const onRebuild = async () => {
    setIsRequestInProgress(true);
    const { status, data: build } = await startNewBuild(buildDetails.build.commitHash);
    setIsRequestInProgress(false);
    if (status === 200) history.push(`/build/${build.id}`);
  };

  return buildDetails.isFetching ? (
    <div className="Page">
      <Loader />
    </div>
  ) : buildDetails.noBuild ? (
    <PageNotFound />
  ) : (
    <BuildDetails
      onRebuild={onRebuild}
      isRequestInProgress={isRequestInProgress}
      repoName={repoName}
      logsText={buildDetails.logsText}
      build={buildDetails.build}
    />
  );
};

// @ts-ignore
const mstp = (state) => ({
  repoName: settingsRepoInfoSS(state).repoName,
});

export default connect(mstp)(BuildDetailsContainer);
