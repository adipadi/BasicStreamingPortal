import * as _ from 'lodash';
import xhr from 'xhr';
import UrlParser from './url-parser';

function getDefaultHeaders() {
  // return { 'x-vimond-jwt': localStorage.getItem('X-Vimond-JWT'), 'Cache-control': 'no-cache' };
  return {};
}

function request(url, opts) {
  const headers = _.assign({}, getDefaultHeaders(), opts.headers || {});
  const parsedUrl = UrlParser.parse(url, opts);
  const options = {
    url: parsedUrl,
    headers,
    method: opts.method,
    json: opts.data
  };

  const promise = new Promise((resolve, reject) => {
    xhr(options, (error, response, body) => {
      if (response.statusCode >= 400 || error) {
        reject({ error, status: response.statusCode, xhr: response });
      } else {
        resolve({ data: body, status: response.statusCode, xhr: response });
      }
    });
  });
  return promise;
}

function get(url, opts) {
  let options = opts || {};
  options = _.assign({}, options, { method: 'GET' });
  return request(url, options);
}

function put(url, opts) {
  let options = opts || {};
  options = _.assign({}, options, { method: 'PUT' });
  return request(url, options);
}

function post(url, opts) {
  let options = opts || {};
  options = _.assign({}, options, { method: 'POST' });
  return request(url, options);
}

function deleteMethod(url, opts) {
  let options = opts || {};
  options = _.assign({}, options, { method: 'DELETE' });
  return request(url, options);
}

module.exports = {
  get,
  put,
  post,
  delete: deleteMethod
};
