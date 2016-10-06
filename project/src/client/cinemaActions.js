import { Request } from 'ajax';
import _ from 'lodash';


export const GET_ASSETS_REQUEST = 'GET_ASSETS_REQUEST';
export const GET_ASSETS_SUCCESS = 'GET_ASSETS_SUCCESS';
export const GET_ASSETS_FAILURE = 'GET_ASSETS_FAILURE';


export function getAssets() {
  const url = '/api/web/search/categories/2220091/assets?query=published:true';
  console.log('HERE');
  return {
    types: [GET_ASSETS_REQUEST, GET_ASSETS_SUCCESS, GET_ASSETS_FAILURE],
    promise: Request.get(url)

  };
}
