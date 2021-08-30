import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import HomePage from './components/HomePage';
import BingoPage from "./components/bingo/BingoPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
      <Router>
          <Switch>
              <Route path="/home">
                  <HomePage />
              </Route>
              <Route path="/">
                  <BingoPage />
              </Route>
          </Switch>
      </Router>
  </Provider>,
  document.getElementById('root')
);
