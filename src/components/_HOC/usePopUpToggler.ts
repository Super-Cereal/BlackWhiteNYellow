import React from 'react';

import { usePopUpTogglerInterface } from './types';

const usePopUpToggler: usePopUpTogglerInterface = (initialValue) => {
  const [popUp, setPopUp] = React.useState<boolean>(initialValue);
  const togglePopUp: React.MouseEventHandler<HTMLElement> = () => setPopUp(!popUp);
  return [popUp, togglePopUp];
};

export default usePopUpToggler;
