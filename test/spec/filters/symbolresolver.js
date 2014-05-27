'use strict';

describe('Filter: symbolResolver', function () {

  // load the filter's module
  beforeEach(module('stockApp'));

  // initialize a new instance of the filter before each test
  var symbolResolver;
  beforeEach(inject(function ($filter) {
    symbolResolver = $filter('symbolResolver');
  }));

  it('should return the input prefixed with "symbolResolver filter:"', function () {
    var symbol = 'MSFT';
    expect(symbolResolver(symbol)).toBe('Microsoft');
  });

});
