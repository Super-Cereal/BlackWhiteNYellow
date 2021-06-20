import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import StartScreen from './components/StartScreen/StartScreen';
import Settings from './components/Settings/Settings';
import BuildHistoryContainer from './components/BuildHistory/BuildHistoryContainer';
import BuildDetailsContainer from './components/BuildDetails/BuildDetailsContainer';

import Footer from './components/Header&Footer/Footer/Footer';

const App: React.FC = () => (
  <div className="App">
    <BrowserRouter>
      <Route path="/" render={() => <StartScreen />} exact />
      <Route path="/settings" render={() => <Settings />} exact />
      <Route path="/buildHistory" render={() => <BuildHistoryContainer />} exact />
      <Route path="/build/:buildId" render={() => <BuildDetailsContainer />} exact />
    </BrowserRouter>
    <Footer />
  </div>
);

// react-device-detect
// react-responsive

export default App;
