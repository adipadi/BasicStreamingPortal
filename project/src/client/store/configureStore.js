import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import { persistState } from 'redux-devtools';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import promiseMiddleware from './promiseMiddleware';

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return matches && matches.length > 0 ? matches[1] : null;
}

const finalCreateStore = compose(
  // Middleware you want to use in development:
  applyMiddleware(promiseMiddleware),

  // Route middleware needed for redux routing
  // applyMiddleware(reduxRouterMiddleware),

  // Required! Enable Redux DevTools with the monitors you chose
  // Sync dispatched route actions to the history
  // DevTools.instrument(),
  module.hot && window.devToolsExtension ? window.devToolsExtension() : f => f,

  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())

)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  const history = syncHistoryWithStore(browserHistory, store);
  // reduxRouterMiddleware.listenForReplays(store);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer));
  }

  // HACK: store passed to middleware is different from this one and cannot dispatch global actions...?
  window.ReduxStore = store;
  return { store, history };
}
