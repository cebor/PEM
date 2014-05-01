'use strict';

angular.module('stockApp')
  .service('Zoom', function Zoom($interval, $timeout) {

    var ZOOM_IN_SPEED = 5;

    var intervals = [];
    var timeouts = [];

    this.start = function (startDate, endDate, range) {

      if (!intervals.length) {

        var firstDate = new Date();
        firstDate.setMonth(endDate.getMonth() - 1);
        var midDate = new Date();
        midDate.setMonth(endDate.getMonth() - Math.floor(range / 2));

        intervals[0] = $interval(function () {
          var tmpDate = new Date(startDate.getTime());

          timeouts[0] = $timeout(function () {
            intervals[1] = $interval(function () {
              if (tmpDate.setDate(tmpDate.getDate() + ZOOM_IN_SPEED) <= firstDate) {
                Highcharts.charts[0].xAxis[0].setExtremes(
                  tmpDate.getTime(),
                  endDate.getTime(),
                  true,
                  false
                );
              } else {
                tmpDate = firstDate;
                $interval.cancel(intervals[1]);
                Highcharts.charts[0].xAxis[0].setExtremes(
                  tmpDate.getTime(),
                  endDate.getTime(),
                  true,
                  true
                );
              }
            }, 1);
          }, 1000);

          timeouts[1] = $timeout(function () {
            Highcharts.charts[0].xAxis[0].setExtremes(
              midDate.getTime(),
              endDate.getTime()
            );
          }, 4000);

          timeouts[2] = $timeout(function () {
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
      angular.forEach(intervals, function (interval) {
        $interval.cancel(interval);
      });

      angular.forEach(timeouts, function (timeout) {
        $timeout.cancel(timeout);
      });

      intervals = [];
      timeouts = [];
    };

  });
