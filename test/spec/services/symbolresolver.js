'use strict';

describe('Service: symbolResolver', function () {

  // load the service's module
  beforeEach(module('stockApp'));

  // instantiate service
  var symbolResolver;
  beforeEach(inject(function (_symbolResolver_) {
    symbolResolver = _symbolResolver_;
  }));

  it('should do something', function () {
    expect(!!symbolResolver).toBe(true);
  });

});
