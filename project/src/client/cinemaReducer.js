import * as CinemaConstants from './cinemaActions';

const initialState = {
  assets: [],
  numberOfHits: 0
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

    default:
      return state;
  }
}
