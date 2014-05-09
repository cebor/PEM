'use strict';

describe('Service: stockSymbols', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var stockSymbols;
  beforeEach(inject(function (_stockSymbols_) {
    stockSymbols = _stockSymbols_;
  }));

  it('should do something', function () {
    expect(!!stockSymbols).toBe(true);
  });

});
