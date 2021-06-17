import React from 'react';

import Header from '../Header&Footer/Header/Header';

import configurationImage from '../../style/images/configuration.svg';

const StartScreen = (): JSX.Element => {
  const titleText = 'School CI server';
  const headerType = 'StartScreen';
  return (
    <>
      <Header titleText={titleText} headerType={headerType} />
      <div className="StartScreen">
        <div className="StartScreen-Settings">
          <img
            src={configurationImage}
            alt="configuration"
            className="StartScreen-SettingsImage"
          />
          <p className="StartScreen-SettingsText">
            Configure repository connection and synchronization settings
          </p>
          <button className="Button Button_bigger Button_color_yellow">
            Open settings
          </button>
        </div>
      </div>
    </>
  );
};

export default StartScreen;
