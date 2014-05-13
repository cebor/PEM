'use strict';

describe('Service: Clock', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var Clock;
  beforeEach(inject(function (_Clock_) {
    Clock = _Clock_;
  }));

  it('should do something', function () {
    expect(!!Clock).toBe(true);
  });

});
