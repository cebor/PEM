'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function ($scope, $timeout, $interval, $filter, StockData) {

    var symbols = [
      'YHOO',
      'MSFT',
      'KO'
    ];

    var RANGE = 6;
    var ZOOM_IN_SPEED = 5;
    var endDate = new Date();
    var startDate = new Date();
    startDate.setMonth(endDate.getMonth() - RANGE);


    StockData.get(symbols, startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10)).then(function (data) {
      $scope.chartConfig.series = data;
      $scope.chartConfig.loading = false;
    });

    // highcharts/highstock config
    $scope.chartConfig = {
      options: {
        chart: {
          type: 'line',
          zoomType: 'x'
        },
        navigator: {
          enabled: true
        }
      },

/*      xAxis: {
        range: 1 * 30 * 24 * 3600 * 1000,
        events: {
          setExtremes: function (e) {
            $scope.report = 'e.min: ' + e.min + ' | e.max: ' + e.max + ' | e.trigger: ' + e.trigger;
          }
        }
      },*/

      rangeSelector: {
        enabled: false
      },
      title: {
        text: 'Stock Data'
      },

      series: [],

      useHighStocks: true,
      loading: true
    };

    var firstDate = new Date();
    firstDate.setMonth(endDate.getMonth() - 1);
    var midDate = new Date();
    midDate.setMonth(endDate.getMonth() - Math.floor(RANGE / 2));

    $interval(function () {
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
  });
