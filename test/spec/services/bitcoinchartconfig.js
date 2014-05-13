'use strict';

describe('Service: BitcoinChartConfig', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var BitcoinChartConfig;
  beforeEach(inject(function (_BitcoinChartConfig_) {
    BitcoinChartConfig = _BitcoinChartConfig_;
  }));

  it('should do something', function () {
    expect(!!BitcoinChartConfig).toBe(true);
  });

});
