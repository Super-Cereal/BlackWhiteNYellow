import React from 'react';

import Header from '../Header&Footer/Header/Header';

import configurationImage from '../../style/images/configuration.svg';

const StartScreen: React.FC = () => {
  const titleText = 'School CI server';
  const headerType = 'StartScreen';
  const buttons = (
    <button className="Button Button_withIcon Button_withIcon_settings Button_onMobile_removeText">
      <span className="Button-Text">Settings</span>
    </button>
  );
  return (
    <>
      <Header titleText={titleText} headerType={headerType} buttons={buttons} />
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
