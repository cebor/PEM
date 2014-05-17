'use strict';

angular.module('stockApp')
  .directive('stockSlider', function () {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        config: '='
      },
      templateUrl: 'views/stockslider.html',
    };
  });
