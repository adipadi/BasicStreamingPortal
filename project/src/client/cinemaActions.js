import { Request } from 'ajax';

export const GET_ASSETS_REQUEST = 'GET_ASSETS_REQUEST';
export const GET_ASSETS_SUCCESS = 'GET_ASSETS_SUCCESS';
export const GET_ASSETS_FAILURE = 'GET_ASSETS_FAILURE';

export const GET_MOVIE_INFORMATION_FOR_ASSET_ID_REQUEST = 'GET_MOVIE_INFORMATION_FOR_ASSET_ID_REQUEST';
export const GET_MOVIE_INFORMATION_FOR_ASSET_ID_SUCCESS = 'GET_MOVIE_INFORMATION_FOR_ASSET_ID_SUCCESS';
export const GET_MOVIE_INFORMATION_FOR_ASSET_ID_FAILURE = 'GET_MOVIE_INFORMATION_FOR_ASSET_ID_FAILURE';

export const CHANGE_PLAYBACK_WITH_ASSET_ID = 'CHANGE_PLAYBACK_WITH_ASSET_ID';
export const SHOW_MOVIE_INFORMATION_WITH_ID = 'SHOW_MOVIE_INFORMATION_WITH_ID';
export const TOGGLE_INITIAL_HEADER = 'TOGGLE_INITIAL_HEADER';
export const SET_IDLE_SECONDS_COUNTER = 'SET_IDLE_SECONDS_COUNTER';

export function getAssets() {
  const url = '/api/web/search/categories/2320/assets';
  return {
    types: [GET_ASSETS_REQUEST, GET_ASSETS_SUCCESS, GET_ASSETS_FAILURE],
    promise: Request.get(url)
  };
}

export function getMovieInformation(id, title) {
  const url = `http://www.omdbapi.com/?t=${title}&y=&plot=short&r=json`;
  return {
    types: [
      GET_MOVIE_INFORMATION_FOR_ASSET_ID_REQUEST,
      GET_MOVIE_INFORMATION_FOR_ASSET_ID_SUCCESS,
      GET_MOVIE_INFORMATION_FOR_ASSET_ID_FAILURE
    ],
    promise: Request.get(url),
    id
  };
}

export function onAssetChange(id) {
  return {
    type: CHANGE_PLAYBACK_WITH_ASSET_ID,
    id
  };
}

export function showMovieInformationWithId(id) {
  return {
    type: SHOW_MOVIE_INFORMATION_WITH_ID,
    id
  };
}

export function toggleInitialHeader() {
  return {
    type: TOGGLE_INITIAL_HEADER,
  };
}

export function setIdleSeconds(value) {
  return {
    type: SET_IDLE_SECONDS_COUNTER,
    value
  };
}
