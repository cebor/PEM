'use strict';

describe('Filter: killHTML', function () {

  // load the filter's module
  beforeEach(module('stockApp'));

  // initialize a new instance of the filter before each test
  var killHTML;
  beforeEach(inject(function ($filter) {
    killHTML = $filter('killHTML');
  }));

  it('should return the input prefixed with "killHTML filter:"', function () {
    var text = 'angularjs';
    expect(killHTML(text)).toBe('killHTML filter: ' + text);
  });

});
