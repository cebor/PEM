'use strict';

angular.module('stockApp')
  .directive('stockTicker', function (Zoom) {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        config: '='
      },
      templateUrl: 'views/stockticker.html',
      link: function postLink(scope) {
        var startDate = scope.config.startDate;
        var endDate = scope.config.endDate;

        Zoom.start(startDate, endDate);

        scope.zoomStart = function () {
          Zoom.start(startDate, endDate);
        };

        scope.zoomStop = function () {
          Zoom.stop();
        };
      }
    };
  });
