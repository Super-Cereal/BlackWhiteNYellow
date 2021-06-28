import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import BuildDetails from './BuildDetails';
import Loader from '../common/Loader/Loader';
import PageNotFound from '../common/PageNotFound/PageNotFound';

// @ts-ignore
import { settingsSS, buildDetailsSS } from '../../redux/storeSelectors';
// @ts-ignore
import { axiosGetBuildDetails } from './../../redux/BuildDetails/buildDetailsActions';
// @ts-ignore
import startNewBuild from '../../axios/startNewBuild';

import { connectedStoreContainerProps, useParamsType } from './types';

const BuildDetailsContainer: React.FC<connectedStoreContainerProps> = ({
  repoName,
  buildDetails,
  axiosGetBuildDetails,
}) => {
  const { buildId } = useParams<useParamsType>();
  React.useEffect(() => axiosGetBuildDetails(buildId), [buildId, axiosGetBuildDetails]);

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
};

export default connect(mstp, odtp)(BuildDetailsContainer);
