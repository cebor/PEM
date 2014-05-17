'use strict';

angular.module('stockApp')
  .directive('stockTicker', function () {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        config: '='
      },
      templateUrl: 'views/stockticker.html'
    };
  });
