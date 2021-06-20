import React from 'react';

import BuildHistory from './BuildHistory';
import { buildHistoryContainerProps } from './types';

import withTransparentBackground from '../withTransparentBackground';

const BuildHistoryContainer: React.FC<buildHistoryContainerProps> = ({
  popUpAdditionalClass,
  togglePopUp,
}) => {
  return <BuildHistory popUpAdditionalClass={popUpAdditionalClass} togglePopUp={togglePopUp} />;
};

export default withTransparentBackground(BuildHistoryContainer);
