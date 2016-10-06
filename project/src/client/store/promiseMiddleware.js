import { browserHistory as history } from 'react-router';


const handleRedirectFromServer = function(result, action) {
  // If the redirect is not in this application react-router we
  // cant push state and need to redirect to the app by window.location.

  if (result && result.data && result.data.redirect && result.data.redirect.indexOf('cms') === -1) {
    window.location = result.data.redirect;
    return;
  }

  setTimeout(() => {
    history.push(result.data.redirect);
  }, action.delay || 0);

};

const handleRedirectFromClient = function(result, action) {
  // If the redirect is not in this application react-router we
  // cant push state and need to redirect to the app by window.location.

  if (action && action.redirect && action.redirect.indexOf('cms') === -1) {
    window.location = action.redirect;
  } else if (action.redirect === 'back') {
    setTimeout(() => {
      history.goBack();
    }, action.delay || 0);
  } else {
    setTimeout(() => {
      history.push(action.redirect);
    }, action.delay || 0);
  }
};

const handleErrorRedirect = function(action, error) {
  if (error.status === 401) {
    // localStorage.setItem(KICKED_PATH, location.pathname);
    if (window.location.pathname.indexOf('login') === -1) {
      history.push('/cms/logout');
    }
  } else if (error.xhr.body.data && error.xhr.body.data.redirect) {
    const redirect = error.xhr.body.data.redirect;
    setTimeout(() => {
      history.push(redirect);
    }, action.delay || 0);
  }
};

export default function promiseMiddleware() {
  return (next) => (action) => {

    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });
    return promise.then(
      (result) => {
        next({ ...rest, result, type: SUCCESS });

        // All redirects should go here
        if (result && result.data && result.data.redirect) {
          handleRedirectFromServer(result, action);
        } else if (action.redirect) {
          handleRedirectFromClient(result, action);
        }
      },
      (error) => {
        next({ ...rest, error, type: FAILURE });
        handleErrorRedirect(action, error);
      }
    );
  };
}
