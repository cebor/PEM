'use strict';

angular.module('stockApp')
  .service('Zoom', function Zoom($interval, $timeout, chartXAxis) {

    var month = 30 * 24 * 3600 * 1000;

    var interval;

    this.start = function (startDate, endDate, range) {

      if (!interval) {

        var min = new Date(startDate).getTime() + Math.floor(range / 3) * month;

        chartXAxis.currentMax = min;

        interval = $interval(function () {
          chartXAxis.currentMax += month;

          if (chartXAxis.currentMax >= new Date(endDate).getTime()) {
            chartXAxis.currentMax = min;
          }
        }, 5000);

      }

    };

    this.stop = function () {
      $interval.cancel(interval);
    };

  });
