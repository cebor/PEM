'use strict';

describe('Service: chartXAxis', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var chartXAxis;
  beforeEach(inject(function (_chartXAxis_) {
    chartXAxis = _chartXAxis_;
  }));

  it('should do something', function () {
    expect(!!chartXAxis).toBe(true);
  });

});
