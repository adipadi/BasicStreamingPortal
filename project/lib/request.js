'use strict';

const request = require('request');
const Promise = require('promise');
const logger = require('./logger');
const _ = require('lodash');

const getHeaders = function (options, token) {
  const jsonVersion = (options.jsonVersion ? `;v=${options.jsonVersion}` : '');
  const defaultHeaders = {
    Accept: options.accept || '*/*',
    'Cache-control': 'no-cache',
    'Content-Type': `application/json${jsonVersion}`
  };

  const extraHeaders = options.headers || {};
  let headers = _.assign({}, defaultHeaders, extraHeaders);

  if (token) {
    headers = _.assign({}, headers, { Authorization: token.authorization });
  }
  return headers;
};

exports.buildQueryString = function (queryObject) {
  if (queryObject) {
    const query = [];
    _.each(queryObject, (value, parameterName) => {
      if (value && {}.hasOwnProperty.call(queryObject, parameterName)) {
        query.push(`${parameterName}=${value}`);
      }
    });

    if (query.length) {
      return `?${query.join('&')}`;
    }
  }
  return '';
};

/**
Common function to handle client input and perform a http request.
*/
function commonRequestHandler(url, suppliedOptions, token, method) {
  let options = {};

  if (url) {
    logger.debug('URL supplied, reading options', url);
    const defaultOptions = { url, json: true };
    options = _.assign({}, defaultOptions, suppliedOptions);
    options.headers = getHeaders(suppliedOptions, token);
  } else {
    // If url is not set, assume caller has set it in options
    // and don't mess with them.
    options = suppliedOptions;
  }

  logger.debug('Options', JSON.stringify(options));

  return new Promise((resolve, reject) => {
    logger.debug('Preparing request');
    options.rejectUnauthorized = false;
    method(options, (error, response, body) => {
      logger.debug('Response from server');
      logger.debug('Error:', error);
      logger.debug('Body', body);
      logger.silly('Response object:', response);

      if (!error && response.statusCode < 400) {
        resolve({ response, body });
      } else {
        reject({ response, body, error });
      }
    });
  });
}

exports.get = function (url, options, token) {
  return commonRequestHandler(url, options, token, request.get);
};

exports.put = function (url, options, token) {
  return commonRequestHandler(url, options, token, request.put);
};

exports.post = function (url, options, token) {
  return commonRequestHandler(url, options, token, request.post);
};

exports.delete = function (url, options, token) {
  return commonRequestHandler(url, options, token, request.del);
};

/**
 * Upload image file to service. Base64 image received as part of
 * input payload will be converted to Buffer and send to server as form data.
 *
 * options.formData.file.preview should contain the base64 encoded image string
 *
 */
exports.upload = function (url, suppliedOptions, token) {
  logger.debug(`options.length: ${suppliedOptions.length}`);
  let promise;

  for (let counter = 0; counter < suppliedOptions.length; counter++) {
    let options = {
      url,
      headers: {
        Accept: '*/*',
        'Cache-control': 'no-cache',
        'Content-Type': 'multipart/form-data; boundary=--l3iPy71otz;',
        Authorization: token.authorization,
      },
      json: true
    };

    const image = _.assign({}, options);
    options = _.assign({}, options, { formData: suppliedOptions[counter] });

    try {
      // Converting base64 image to binary
      const data = new Buffer(options.formData.file.base64Img, 'base64');
      logger.debug('[upload] Image converted to Binary');
      // Create request payload with appropriate image details
      image.formData = {};
      image.formData.file = {};
      image.formData.file.value = data;
      image.formData.file.options = {};
      image.formData.file.options.filename = options.formData.title;
      // TODO - Appropriate image type needs to be set
      image.formData.file.options.contentType = 'image/jpg';
      // setting title and tags
      image.formData.title = options.formData.title;
      image.formData.tags = options.formData.tagList.join();
      image.formData.scaledImageUrl = options.formData.file.preview;
    } catch (e) {
      logger.error(`[upload] Data format error: ${e}`);
    }

    logger.debug('[upload] image loaded correctly, posting it to service');

    promise = commonRequestHandler(null, image, token, request.post);

    logger.debug('[upload] Exit');
  }

  return promise;
};


exports.uploadImage = (suppliedOptions, token) => {
  const headers = suppliedOptions.headers || {};
  const formData = Object.assign({}, suppliedOptions.formData);
  const options = {
    url: suppliedOptions.url,
    headers: {
      Accept: '*/*' || headers.accept,
      'Cache-control': 'no-cache' || headers['Cache-control'],
      'Content-Type': 'multipart/form-data' || headers['Content-Type'],
      Authorization: token.authorization || headers.authorization
    },
    formData,
    json: true
  };
  const promise = commonRequestHandler(null, options, token, request.post);
  return promise;

};
