import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import BuildDetails from './BuildDetails';
import Loader from '../common/Loader/Loader';
import PageNotFound from '../common/PageNotFound/PageNotFound';

// @ts-ignore
import { settingsSS, buildDetailsSS } from '../../redux/storeSelectors';
// @ts-ignore
import { axiosGetBuildDetails, clearBuildDetailsLoadInfo } from './redux/buildDetailsActions';
// @ts-ignore
import startNewBuild from '../../axios/startNewBuild';

import { connectedStoreContainerProps, useParamsType } from './types';

const BuildDetailsContainer: React.FC<connectedStoreContainerProps> = ({
  repoName,
  buildDetails,
  axiosGetBuildDetails,
  clearBuildDetailsLoadInfo,
}) => {
  const { buildId } = useParams<useParamsType>();
  React.useEffect(() => {
    axiosGetBuildDetails(buildId);
    return clearBuildDetailsLoadInfo;
  }, [buildId, axiosGetBuildDetails, clearBuildDetailsLoadInfo]);

  const history = useHistory();
  const [isRebuildInProgress, setIsRebuildInProgress] = React.useState(false);
  const onRebuild = async () => {
    setIsRebuildInProgress(true);
    const { status, data: build } = await startNewBuild(buildDetails.build.commitHash);
    setIsRebuildInProgress(false);
    if (status === 200) history.push(`/build/${build.id}`);
  };

  return buildDetails.loadInfo.isFetching ? (
    <div className="Page">
      <Loader />
    </div>
  ) : buildDetails.loadInfo.noBuild ? (
    <PageNotFound />
  ) : (
    <BuildDetails rebuild={{ onRebuild, isRebuildInProgress }} repoName={repoName} build={buildDetails.build} />
  );
};

// @ts-ignore
const mstp = (state) => ({
  repoName: settingsSS.repoInfo(state).repoName,
  buildDetails: { build: buildDetailsSS.buildInfo(state), loadInfo: buildDetailsSS.loadInfo(state) },
});

const odtp = {
  axiosGetBuildDetails,
  clearBuildDetailsLoadInfo,
};

export default connect(mstp, odtp)(BuildDetailsContainer);
