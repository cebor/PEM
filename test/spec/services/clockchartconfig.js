'use strict';

describe('Service: ClockChartConfig', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var ClockChartConfig;
  beforeEach(inject(function (_ClockChartConfig_) {
    ClockChartConfig = _ClockChartConfig_;
  }));

  it('should do something', function () {
    expect(!!ClockChartConfig).toBe(true);
  });

});
