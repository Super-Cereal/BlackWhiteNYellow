import React from 'react';

import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ titleText, headerType, buttons }) => {
  return (
    <header className="Header">
      <h1 className={`Header-Title Header-Title_${headerType} fontType_headline`}>{titleText}</h1>
      <div className="Header-Buttons">{buttons}</div>
    </header>
  );
};

export default Header;
