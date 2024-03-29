import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import configurationImage from '../../style/images/configuration.svg';

// @ts-ignore
import grabMetrics from '../../metrics/grabMetrics';

import './StartScreen.scss';

const StartScreen: React.FC = () => {
  React.useEffect(() => grabMetrics('start screen'), []);

  const history = useHistory();
  const buttons = (
    <button
      onClick={() => history.push('/settings')}
      className="Button Button_withIcon Button_withIcon_settings Button_onMobile_removeText"
      data-testid="StartScreen-HeaderLinkToSettings"
    >
      <span className="Button-Text">Settings</span>
    </button>
  );
  return (
    <>
      <Header titleText={'School CI server'} headerType={'StartScreen'} buttons={buttons} />
      <div className="StartScreen Page" data-testid="StartScreen">
        <div className="StartScreen-Settings">
          <img src={configurationImage} alt="configuration" className="StartScreen-Settings-Image" />
          <p className="StartScreen-Settings-Text">
            Configure repository connection
            <br />
            and synchronization settings
          </p>
          <button
            data-testid="StartScreen-CentralLintToSettings"
            onClick={() => history.push('/settings')}
            className="Button Button_bigger Button_color_yellow"
          >
            Open settings
          </button>
        </div>
      </div>
    </>
  );
};

export default StartScreen;
