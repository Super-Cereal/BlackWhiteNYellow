import React from 'react';

import Header from '../Header&Footer/Header/Header';
import SettingsFormContainer from './SettingsForm';

const Settings: React.FC = () => (
  <>
    <Header titleText={'School CI server'} headerType={'Settings'} />
    <div className="Settings Page">
      <div className="Settings-Titles">
        <h2 className="Settings-Titles-MainTitle fontType_caption">Settings</h2>
        <h3 className="Settings-Titles-InfoTitle">
          Configure&nbsp;repository&nbsp;connection
          and&nbsp;synchronization&nbsp;settings.
        </h3>
      </div>
      <SettingsFormContainer />
    </div>
  </>
);

export default Settings;
