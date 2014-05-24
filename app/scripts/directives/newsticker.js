'use strict';

angular.module('stockApp')
  .directive('newsTicker', function () {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        feed: '='
      },
      templateUrl: 'views/newsticker.html'
    };
  });
