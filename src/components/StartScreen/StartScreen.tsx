import React from 'react';

import Header from '../Header&Footer/Header/Header';

import configurationImage from '../../style/images/configuration.svg';

const StartScreen: React.FC = () => {
  const titleText = 'School CI server';
  const headerType = 'StartScreen';
  return (
    <>
      <Header titleText={titleText} headerType={headerType} />
      <div className="StartScreen Page">
        <div className="StartScreen-Settings">
          <img src={configurationImage} alt="configuration" className="StartScreen-Settings-Image" />
          <p className="StartScreen-Settings-Text">
            Configure repository connection
            <br />
            and synchronization settings
          </p>
          <button className="Button Button_bigger Button_color_yellow">Open settings</button>
        </div>
      </div>
    </>
  );
};

export default StartScreen;
