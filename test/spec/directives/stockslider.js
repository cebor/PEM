'use strict';

describe('Directive: stockSlider', function () {

  // load the directive's module
  beforeEach(module('stockApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<stock-slider></stock-slider>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the stockSlider directive');
  }));
});
