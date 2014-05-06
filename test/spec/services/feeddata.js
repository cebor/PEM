'use strict';

describe('Service: feedData', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var feedData;
  beforeEach(inject(function (_feedData_) {
    feedData = _feedData_;
  }));

  it('should do something', function () {
    expect(!!feedData).toBe(true);
  });

});
