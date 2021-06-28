import React from 'react';
import { Link } from 'react-router-dom';

import { HeaderProps } from './types';

import './Header.scss';

const Header: React.FC<HeaderProps> = ({ titleText, headerType, buttons }) => {
  return (
    <header className="Header">
      <Link to="/">
        <h1 className={`Header-Title Header-Title_${headerType} fontType_headline`}>{titleText}</h1>
      </Link>
      <div className="Header-Buttons">{buttons}</div>
    </header>
  );
};

export default Header;
