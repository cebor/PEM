'use strict';

describe('Service: FeedData', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var FeedData;
  beforeEach(inject(function (_FeedData_) {
    FeedData = _FeedData_;
  }));

  it('should do something', function () {
    expect(!!FeedData).toBe(true);
  });

});
