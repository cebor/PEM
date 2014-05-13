'use strict';

describe('Service: bitcoinData', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var bitcoinData;
  beforeEach(inject(function (_bitcoinData_) {
    bitcoinData = _bitcoinData_;
  }));

  it('should do something', function () {
    expect(!!bitcoinData).toBe(true);
  });

});
