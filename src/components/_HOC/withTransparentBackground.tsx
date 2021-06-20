import React from 'react';

import { withTransparentBackgroundType } from './types';

import usePopUpToggler from './usePopUpToggler';

const withTransparentBackground: withTransparentBackgroundType = (Component) => () => {
  const [popUp, togglePopUp] = usePopUpToggler(false)
  return (
    <>
      <Component
        togglePopUp={togglePopUp}
        popUpAdditionalClass={`withTransparentBackground_component withTransparentBackground_component_${popUp}`}
      />
      <span
        className={`withTransparentBackground_span withTransparentBackground_span_${popUp}`}
        onClick={togglePopUp}
      ></span>
    </>
  );
};

export default withTransparentBackground;
