import { connect } from 'react-redux';

// @ts-ignore
import { appSS, settingsSS } from './redux/storeSelectors';
// @ts-ignore
import { initializeApp } from './redux/app/appActions';
import App from './App';

// @ts-ignore
const mstp = (state) => ({
  isInitialized: appSS.isInitialized(state),
  haveSettings: settingsSS.haveSettings(state),
});
const odtp = { initializeApp };

export default connect(mstp, odtp)(App);
