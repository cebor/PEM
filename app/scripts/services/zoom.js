'use strict';

angular.module('stockApp')
  .service('Zoom', function Zoom($interval, $timeout, chartXAxis) {

    var MONTH = 30 * 24 * 3600 * 1000;

    var interval;

    this.start = function (startDate, endDate) {
      if (!interval) {
        var min = new Date(endDate).getTime() - MONTH;

        chartXAxis.currentMin = min;

        interval = $interval(function () {
          chartXAxis.currentMin -= MONTH;

          if (chartXAxis.currentMin <= new Date(startDate).getTime()) {
            chartXAxis.currentMin = min;
          }
        }, 3000);
      }
    };

    this.stop = function () {
      if (interval) {
        $interval.cancel(interval);
        interval = undefined;
      }
    };

  });
