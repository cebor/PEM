'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function ($scope, $timeout, StockData) {

    var symbols = [
      'YHOO',
      'MSFT',
      'KO'
    ];

    StockData.get(symbols, '2013-09-01', '2014-03-31').then(function (data) {
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

      xAxis: {
        range: 1 * 30 * 24 * 3600 * 1000,
        events: {
          setExtremes: function (e) {
            $scope.report = 'e.min: ' + e.min + ' | e.max: ' + e.max + ' | e.trigger: ' + e.trigger;
          }
        }
      },

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

    $timeout(function () {
      Highcharts.charts[0].xAxis[0].setExtremes(1388707200000, 1396224000000, true, true);
    }, 4000);

    $timeout(function () {
      Highcharts.charts[0].xAxis[0].setExtremes(1386028800000, 1396224000000, true, true);
    }, 6000);

    $timeout(function () {
      Highcharts.charts[0].xAxis[0].setExtremes(0, 1396224000000, true, true);
    }, 7000);
  });
