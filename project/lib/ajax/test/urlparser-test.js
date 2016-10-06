// jest.dontMock('../url-parser');
// jest.dontMock('lodash');
//
// var UrlParser = require('../url-parser');
//
import expect from 'expect'
import UrlParser from '../url-parser'

describe('UrlParser', () => {

  it('replaces variables in url', () => {
    var url = '/some/url/with/:param/in/path';
    var options = {
      params: {
        param: 'variable'
      }
    };

    var result = UrlParser.parse(url, options);

    expect(result).toBe('/some/url/with/variable/in/path');
  })

  it('does not replace missing params in url', function() {
    var url = '/some/url/with/:missing/in/path';

    var func = function() {
      UrlParser.parse(url, null)
    }

    expect(func).toThrow('Missing parameter: :missing');
  })


  it('generates querystring for query params', function() {
    var url = '/some/url/with/query/params';
    var options = {
                   query: {
                     page: 1,
                     search: 'text'
                   }
                 };

    var result = UrlParser.parse(url, options);

    expect(result).toEqual('/some/url/with/query/params?page=1&search=text');
  })



  it('does all of the above', function() {
    var url = '/some/url/with/:param/in/path';
    var options = {
      params: {
        param: 'variable'
      },
      query: {
        page: 1,
        search: 'text'
      }
    };

    var result = UrlParser.parse(url, options);
    expect(result).toEqual('/some/url/with/variable/in/path?page=1&search=text');
  })

})

// describe('Request', function() {
//
//   it('replaces variables in url', function() {
//     var url = '/some/url/with/:param/in/path';
//     var options = {
//                    params: {
//                      param: 'variable'
//                    }
//                  };
//
//     var result = UrlParser.parse(url, options);
//
//     expect(result).toEqual('/some/url/with/variable/in/path');
//   });
//
//   it('does not replace missing params in url', function() {
//     var url = '/some/url/with/:missing/in/path';
//
//     var func = function() {
//       UrlParser.parse(url, null)
//     }
//
//     expect(func).toThrow('Missing parameter: :missing');
//   });
//
//   it('generates querystring for query params', function() {
//     var url = '/some/url/with/query/params';
//     var options = {
//                    query: {
//                      page: 1,
//                      search: 'text'
//                    }
//                  };
//
//     var result = UrlParser.parse(url, options);
//
//     expect(result).toEqual('/some/url/with/query/params?page=1&search=text');
//   });
//
//   it('does all of the above', function() {
//     var url = '/some/url/with/:param/in/path';
//     var options = {
//                    params: {
//                      param: 'variable'
//                    },
//                    query: {
//                      page: 1,
//                      search: 'text'
//                    }
//                  };
//
//     var result = UrlParser.parse(url, options);
//
//     expect(result).toEqual('/some/url/with/variable/in/path?page=1&search=text');
//   });
//
//
// });
