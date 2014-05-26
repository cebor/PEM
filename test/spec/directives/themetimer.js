'use strict';

describe('Directive: ThemeTimer', function () {

  // load the directive's module
  beforeEach(module('stockApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-theme-timer></-theme-timer>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ThemeTimer directive');
  }));
});
