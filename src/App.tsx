import React, { EffectCallback } from 'react';
import { Route, Switch } from 'react-router-dom';

import StartScreen from './components/StartScreen/StartScreen';
import Settings from './components/Settings/Settings';
import BuildHistoryContainer from './components/BuildHistory/BuildHistoryContainer';
import BuildDetailsContainer from './components/BuildDetails/BuildDetailsContainer';
import Footer from './components/Footer/Footer';
import Loader from './components/common/Loader/Loader';
import PageNotFound from './components/common/PageNotFound/PageNotFound';
// @ts-ignore
import MetricsPage from './components/metricsPage/MetricsPage';

type connectedStore = {
  isInitialized: boolean;
  initializeApp: EffectCallback;
  haveSettings: boolean;
};
const App: React.FC<connectedStore> = ({ isInitialized, initializeApp, haveSettings }) => {
  React.useEffect(initializeApp, [initializeApp]);
  if (!isInitialized)
    return (
      <div className="App">
        <Loader testid="AppNotInitLoader" />
      </div>
    );

  return (
    <div className="App">
      <Switch>
        <Route path="/" render={() => (haveSettings ? <BuildHistoryContainer /> : <StartScreen />)} exact />
        <Route path="/settings" render={() => <Settings />} exact />
        <Route path="/build/:buildId" render={() => <BuildDetailsContainer />} exact />
        <Route path="/service/metrics" render={() => <MetricsPage />} exact />
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
