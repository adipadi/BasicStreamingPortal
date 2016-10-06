import * as _ from 'lodash';

/*
parse('/url/:key1/:key2', {
  params: {
    key1: 'value1',
    key2: 'value2',
  },
  query: {
    key1: 'value1',
    key2: 'value2'
  }
});

yields: /url/value1/value2?key1=value1&key2=value2
*/

function parse(url, opts) {
  const options = opts || {};
  const urlSegments = url.split('/');
  const params = options.params || {};
  const query = options.query || {};

  const urlResult = [];
  const queryResult = [];

  _.each(urlSegments, (part) => {
    if (part.indexOf(':') === 0) {
      const param = params[part.substring(1)];
      if (!param) {
        throw new Error(`Missing parameter: ${part}`);
      } else {
        urlResult.push(param);
      }
    } else {
      urlResult.push(part);
    }
  });

  if (query) {
    _.each(Object.keys(query), (key) => {
      queryResult.push(`${key}=${query[key]}`);
    });
  }

  const queryString = queryResult.length > 0 ? `?${queryResult.join('&')}` : '';
  const urlString = urlResult.join('/');

  return urlString + queryString;
}

module.exports = {
  parse
};
