'use strict';

angular.module('stockApp')
  .service('Zoom', function Zoom($interval, $timeout) {

    var ZOOM_IN_SPEED = 5;

    var intervalId;

    this.start = function (startDate, endDate, range) {

      if (!intervalId) {

        var firstDate = new Date();
        firstDate.setMonth(endDate.getMonth() - 1);
        var midDate = new Date();
        midDate.setMonth(endDate.getMonth() - Math.floor(range / 2));

        intervalId = $interval(function () {
          var tmpDate = new Date(startDate.getTime());

          $timeout(function () {
            var stop = $interval(function () {
              if (tmpDate.setDate(tmpDate.getDate() + ZOOM_IN_SPEED) <= firstDate) {
                Highcharts.charts[0].xAxis[0].setExtremes(
                  tmpDate.getTime(),
                  endDate.getTime(),
                  true,
                  false
                );
              } else {
                tmpDate = firstDate;
                $interval.cancel(stop);
                Highcharts.charts[0].xAxis[0].setExtremes(
                  tmpDate.getTime(),
                  endDate.getTime(),
                  true,
                  true
                );
              }
            }, 1);
          }, 1000);

          $timeout(function () {
            Highcharts.charts[0].xAxis[0].setExtremes(
              midDate.getTime(),
              endDate.getTime()
            );
          }, 4000);

          $timeout(function () {
            Highcharts.charts[0].xAxis[0].setExtremes(
              startDate.getTime(),
              endDate.getTime(),
              true,
              true
            );
          }, 6000);

        }, 7000);

      }

    };

    this.stop = function () {
      $interval.cancel(intervalId);
      intervalId = undefined;
    };

  });
