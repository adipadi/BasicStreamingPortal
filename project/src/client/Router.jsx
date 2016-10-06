import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import Cinema from './Cinema';

require('./styles.scss');

// Static


const { store, history } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Cinema}/>
    </Router>
  </Provider>
  , document.getElementById('content')
);
