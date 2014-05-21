'use strict';

describe('Service: stockData', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var stockData;
  beforeEach(inject(function (_stockData_) {
    stockData = _stockData_;
  }));

  it('should do something', function () {
    expect(!!stockData).toBe(true);
  });

});
