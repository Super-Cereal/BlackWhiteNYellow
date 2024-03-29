import React from 'react';

import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <div className="Footer">
      <div>
        <a className="Footer-Link" href="http://" target="_blank" rel="noopener noreferrer">
          Support
        </a>
        <a className="Footer-Link" href="http://" target="_blank" rel="noopener noreferrer">
          Learning
        </a>
        <a className="Footer-Link" href="http://" target="_blank" rel="noopener noreferrer">
          Русская версия
        </a>
      </div>
      <div>
        <a className="Footer-Link" href="http://" target="_blank" rel="noopener noreferrer">
          © 2020 Super-Cereal
        </a>
      </div>
    </div>
  );
};

export default Footer;
