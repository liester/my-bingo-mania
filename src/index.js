import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import store from './store/store';
import BingoGame from './components/bingo/BingoGame';
import BingoHost from './components/bingo-host/BingoHost';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/styles.scss';
import Header from './components/Header';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Header />
      <Switch>
        <Route path="/host">
          <BingoHost />
        </Route>
        <Route path="/game">
          <BingoGame />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
