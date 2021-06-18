import React from 'react';

import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ titleText, headerType }) => {
  const ButtonsElems = createButtonsElems(headerType);
  return (
    <header className="Header">
      <h1 className={`Header-Title Header-Title_${headerType} fontType_headline`}>{titleText}</h1>
      <div className="Header-Buttons">{ButtonsElems}</div>
    </header>
  );
};

const createButtonsElems = (headerType: HeaderProps['headerType']): JSX.Element => {
  switch (headerType) {
    case 'StartScreen':
      return (
        <>
          <button className="Button Button_withIcon Button_withIcon_settings Button_onMobile_removeText">
            <span className="Button-Text">Settings</span>
          </button>
        </>
      );
    case 'BuildHistory':
      return (
        <>
          <button className="Button Button_withIcon Button_withIcon_run Button_onMobile_removeText">
            <span className="Button-Text">Run Build</span>
          </button>
          <button className="Button Button_withIcon Button_withIcon_settings"></button>
        </>
      );
    case 'Settings':
      return <></>;
    case 'BuildDetails':
      return (
        <>
          <button className="Button Button_withIcon Button_withIcon_rebuild Button_onMobile_removeText">
            <span className="Button-Text">Rebuild</span>
          </button>
          <button className="Button Button_withIcon Button_withIcon_settings"></button>
        </>
      );
  }
};

export default Header;
