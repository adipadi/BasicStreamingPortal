import * as CinemaConstants from './cinemaActions';
import _ from 'lodash';

const initialState = {
  playingAssetId: 0,
  assets: [],
  numberOfHits: 0,
  movieInformationArray: [],
  showMovieInformationWithId: false,
  loading: false
};

export default function featureReducer(state = initialState, action) {
  switch (action.type) {
    case CinemaConstants.GET_ASSETS_REQUEST: {
      return state;
    }

    case CinemaConstants.GET_ASSETS_SUCCESS: {
      const res = action.result && action.result.data && action.result.data.assets;
      const assets = res.asset;
      const numberOfHits = res.numberOfHits;
      return {
        ...state,
        assets,
        numberOfHits
      };
    }

    case CinemaConstants.GET_ASSETS_FAILURE: {
      return initialState;
    }

    case CinemaConstants.GET_MOVIE_INFORMATION_FOR_ASSET_ID_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case CinemaConstants.GET_MOVIE_INFORMATION_FOR_ASSET_ID_SUCCESS: {
      const exists = _.find(state.movieInformationArray, m => m.id === action.id);
      if (exists) {
        return { ...state };
      }
      const arr = state.movieInformationArray.slice();
      arr.push({ assetId: action.id, ...action.result.data });
      return {
        ...state,
        movieInformationArray: arr,
        loading: false
      };
    }

    case CinemaConstants.GET_MOVIE_INFORMATION_FOR_ASSET_ID_FAILURE: {
      return {
        ...state,
        loading: false,
      };
    }

    case CinemaConstants.CHANGE_PLAYBACK_WITH_ASSET_ID: {
      return {
        ...state,
        playingAssetId: action.id
      };
    }

    case CinemaConstants.SHOW_MOVIE_INFORMATION_WITH_ID: {
      const id = state.showMovieInformationWithId === action.id ? false : action.id;
      return {
        ...state,
        showMovieInformationWithId: action.id
      };
    }

    default:
      return state;
  }
}
