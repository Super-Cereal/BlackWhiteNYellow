import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import BuildDetails from './BuildDetails';
import { connectedStoreContainerProps, useParamsType } from './types';

// @ts-ignore
import { settingsRepoInfoSS } from '../../redux/storeSelectors';
// @ts-ignore
import { useRequestForBuildDetails } from './buildDetailsReducer';

import Loader from '../common/Loader/Loader';
import PageNotFound from '../common/PageNotFound/PageNotFound';

const BuildDetailsContainer: React.FC<connectedStoreContainerProps> = ({ repoName }) => {
  const { buildId } = useParams<useParamsType>();
  const [state] = useRequestForBuildDetails(buildId);
  return state.isFetching ? (
    <div className="Page">
      <Loader />
    </div>
  ) : state.noBuild ? (
    <PageNotFound />
  ) : (
    <BuildDetails logsText={state.logsText} repoName={repoName} build={state.build} />
  );
};

// @ts-ignore
const mstp = (state) => ({
  repoName: settingsRepoInfoSS(state).repoName,
});
export default connect(mstp)(BuildDetailsContainer);
