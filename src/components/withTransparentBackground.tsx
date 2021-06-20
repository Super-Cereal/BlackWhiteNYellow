import React from 'react';

type withTransparentBackgroundType = (Component: any) => React.FC<any>;

const withTransparentBackground: withTransparentBackgroundType = (Component) => () => {
  const [popUp, setPopUp] = React.useState<boolean>(false);
  const togglePopUp: React.MouseEventHandler<HTMLElement> = () =>
    setPopUp(popUp ? false : true);
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
