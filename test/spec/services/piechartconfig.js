'use strict';

describe('Service: PieChartConfig', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var PieChartConfig;

  beforeEach(inject(function (_PieChartConfig_) {
    PieChartConfig = _PieChartConfig_;
  }));

  it('should do something', function () {
    expect(!!PieChartConfig).toBe(true);
  });

});
