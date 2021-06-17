import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import StartScreen from './components/StartScreen/StartScreen';
import Settings from './components/Settings/Settings';
import BuildHistory from './components/BuildHistory/BuildHistory';
import BuildDetailsContainer from './components/BuildDetails/BuildDetailsContainer';

import Footer from './components/Header&Footer/Footer/Footer';

const App = (): JSX.Element => (
  <div className="App">
    <BrowserRouter>
      <Route path="/" render={() => <StartScreen />} exact />
      <Route path="/settings" render={() => <Settings />} exact />
      <Route path="/buildHistory" render={() => <BuildHistory />} exact />
      <Route path="/buildDetails" render={() => <BuildDetailsContainer buildId={'lol'} />} exact />
    </BrowserRouter>
    <Footer />
  </div>
);

// react-device-detect
// react-responsive

export default App;
