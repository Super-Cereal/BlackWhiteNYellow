import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import StartScreen from './components/StartScreen/StartScreen';
import Settings from './components/Settings/Settings';
import BuildHistory from './components/BuildHistory/BuildHistory';
import BuildDetails from './components/BuildDetails/BuildDetails';

import Footer from './components/Header&Footer/Footer/Footer';

const App = (): JSX.Element => (
  <>
    <BrowserRouter>
      <Route path="/" render={() => <StartScreen />} exact />
      <Route path="/settings" render={() => <Settings />} exact />
      <Route path="/buildHistory" render={() => <BuildHistory />} exact />
      <Route path="/buildDetails" render={() => <BuildDetails />} exact />
    </BrowserRouter>
    <Footer />
  </>
);

// react-device-detect
// react-responsive

export default App;
