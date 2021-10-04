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
import LandingPage from './components/landing-page/LandingPage';
import FlexContainer from './components/common/flex-container/FlexContainer';
import Header from './components/header/Header';

ReactDOM.render(
  <Provider store={store}>
    <FlexContainer flexDirection="column" style={{ height: '100%' }}>
      <Router>
        <Header />
        <Switch>
          <Route path="/host">
            <BingoHost />
          </Route>
          <Route path="/game/:gameCode?">
            <BingoGame />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </FlexContainer>
  </Provider>,
  document.getElementById('root'),
);
