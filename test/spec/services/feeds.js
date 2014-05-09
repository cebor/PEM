'use strict';

describe('Service: feeds', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var feeds;
  beforeEach(inject(function (_feeds_) {
    feeds = _feeds_;
  }));

  it('should do something', function () {
    expect(!!feeds).toBe(true);
  });

});
