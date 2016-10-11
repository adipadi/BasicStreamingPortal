import * as CinemaConstants from './cinemaActions';
import _ from 'lodash';

const initialState = {
  playingAssetId: '6967',
  assets: [],
  numberOfHits: 0,
  movieInformationArray: [],
  showMovieInformationWithId: '',
  assetsLoading: false,
  movieInformationLoading: false,
  showInitialHeader: false,
  idleSecondsCounter: 0
};

export default function featureReducer(state = initialState, action) {
  switch (action.type) {
    case CinemaConstants.GET_ASSETS_REQUEST: {
      return {
        ...state,
        assetsLoading: true,
      };
    }

    case CinemaConstants.GET_ASSETS_SUCCESS: {
      const res = action.result && action.result.data && action.result.data.assets;
      const assets = res.asset;
      const numberOfHits = res.numberOfHits;
      return {
        ...state,
        assets,
        numberOfHits,
        assetsLoading: false,
        showInitialHeader: true
      };
    }

    case CinemaConstants.GET_ASSETS_FAILURE: {
      return initialState;
    }

    case CinemaConstants.GET_MOVIE_INFORMATION_FOR_ASSET_ID_REQUEST: {
      return {
        ...state,
        movieInformationLoading: true,
      };
    }

    // Make a case for successfully retrieved movie information

    case CinemaConstants.GET_MOVIE_INFORMATION_FOR_ASSET_ID_FAILURE: {
      return {
        ...state,
        movieInformationLoading: false,
      };
    }

    case CinemaConstants.CHANGE_PLAYBACK_WITH_ASSET_ID: {
      return {
        ...state,
        playingAssetId: action.id
      };
    }

    // Make a case for showing movie information with id

    case CinemaConstants.TOGGLE_INITIAL_HEADER: {
      return {
        ...state,
        showInitialHeader: !state.showInitialHeader
      };
    }

    case CinemaConstants.SET_IDLE_SECONDS_COUNTER: {
      return {
        ...state,
        idleSecondsCounter: action.value
      };
    }

    default:
      return state;
  }
}
