'use strict';

angular.module('stockApp')
  .directive('newsTicker', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the newsTicker directive');
      }
    };
  });
