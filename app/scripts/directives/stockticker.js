'use strict';

angular.module('stockApp')
  .directive('stockTicker', function () {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        config: '='
      },
      templateUrl: 'views/stockticker.html',
      controller: ['$scope', '$timeout', 'Zoom', function ($scope, $timeout, Zoom) {
        var startDate = $scope.config.startDate;
        var endDate = $scope.config.endDate;

        Zoom.start(startDate, endDate);

        $scope.zoomStart = function () {
          $timeout(function () {
            Zoom.start(startDate, endDate);
          }, 3000);
        };

        $scope.zoomStop = function () {
          Zoom.stop();
        };

        $scope.$on('$destroy', function () {
          Zoom.stop();
        });
      }]
    };
  });
