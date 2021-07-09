import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import BuildDetails from './BuildDetails';
import Loader from '../common/Loader/Loader';
import PageNotFound from '../common/PageNotFound/PageNotFound';

// @ts-ignore
import { settingsSS, buildDetailsSS } from '../../redux/storeSelectors';
// @ts-ignore
import { axiosGetBuildDetails, clearBuildDetailsLoadInfo, axiosStartNewBuild } from './redux/buildDetailsActions';

import { connectedStoreContainerProps, useParamsType } from './types';

// @ts-ignore
import grabMetrics from './../../metrics/grabMetrics';

export const BuildDetailsContainer: React.FC<connectedStoreContainerProps> = ({
  repoName,
  buildDetails,
  isRebuilding,
  axiosStartNewBuild,
  axiosGetBuildDetails,
  clearBuildDetailsLoadInfo,
}) => {
  React.useEffect(() => grabMetrics('build details'), []);

  const { buildId } = useParams<useParamsType>();
  React.useEffect(() => {
    axiosGetBuildDetails(buildId);
    return clearBuildDetailsLoadInfo;
  }, [buildId, axiosGetBuildDetails, clearBuildDetailsLoadInfo]);

  const history = useHistory();
  const onRebuild = async () => {
    const { status, build } = await axiosStartNewBuild(buildDetails.build.commitHash);
    if (status === 200) history.push(`/build/${build.id}`);
  };

  return buildDetails.loadInfo.isFetching ? (
    <div className="Page">
      <Loader testid="BuildDetailsLoading" />
    </div>
  ) : buildDetails.loadInfo.noBuild ? (
    <PageNotFound />
  ) : (
    <BuildDetails
      rebuild={{ onRebuild, isRebuildInProgress: isRebuilding }}
      repoName={repoName}
      build={buildDetails.build}
    />
  );
};

// @ts-ignore
const mstp = (state) => ({
  repoName: settingsSS.repoInfo(state).repoName,
  buildDetails: { build: buildDetailsSS.buildInfo(state), loadInfo: buildDetailsSS.loadInfo(state) },
  isRebuilding: buildDetailsSS.isRebuilding(state),
});

const odtp = {
  axiosStartNewBuild,
  axiosGetBuildDetails,
  clearBuildDetailsLoadInfo,
};

export default connect(mstp, odtp)(BuildDetailsContainer);
