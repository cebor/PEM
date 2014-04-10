'use strict';

describe('Service: StockData', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var StockData;
  beforeEach(inject(function (_StockData_) {
    StockData = _StockData_;
  }));

  it('should do something', function () {
    expect(!!StockData).toBe(true);
  });

});
