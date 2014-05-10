'use strict';

describe('Service: StockChartConfig', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var StockChartConfig;
  beforeEach(inject(function (_StockChartConfig_) {
    StockChartConfig = _StockChartConfig_;
  }));

  it('should do something', function () {
    expect(!!StockChartConfig).toBe(true);
  });

});
