import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import cinemaReducer from '../cinemaReducer';

export default combineReducers({
  routing: routerReducer,
  cinemaReducer
});
