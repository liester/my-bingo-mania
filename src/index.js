import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import store from './store/store';
import BingoGame from './components/bingo-game/BingoGame';
import BingoHost from './components/bingo-host/BingoHost';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/styles.scss';
// import Header from './components/Header';
import LandingPage from './components/landing-page/Home';
import FlexContainer from './components/common/FlexContainer';

ReactDOM.render(
  <FlexContainer justifyContent="center" alignItems="center" style={{ height: '100%' }}>
    <Provider store={store}>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route path="/host">
            <BingoHost />
          </Route>
          <Route path="/game">
            <BingoGame />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  </FlexContainer>,
  document.getElementById('root'),
);
