'use strict';

angular.module('stockApp')
  .directive('stockSlider', function () {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        slides: '=',
        title: '='
      },
      templateUrl: 'views/stockslider.html',
    };
  });
