'use strict';

describe('Service: ChartConfig', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var ChartConfig;
  beforeEach(inject(function (_ChartConfig_) {
    ChartConfig = _ChartConfig_;
  }));

  it('should do something', function () {
    expect(!!ChartConfig).toBe(true);
  });

});
