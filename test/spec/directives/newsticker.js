'use strict';

describe('Directive: newsTicker', function () {

  // load the directive's module
  beforeEach(module('stockApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    //element = angular.element('<news-ticker></news-ticker>');
    //element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the newsTicker directive');
  }));
});
