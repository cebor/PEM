'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function ($scope, StockData, Zoom) {

    var symbols = [
      'YHOO',
      'MSFT',
      'KO'
    ];

    var RANGE = 6;

    var startDate = new Date();
    var endDate = new Date();
    startDate.setMonth(new Date().getMonth() - RANGE);


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

      // xAxis: {
      //   range: 1 * 30 * 24 * 3600 * 1000,
      //   events: {
      //     setExtremes: function (e) {
      //       $scope.report = 'e.min: ' + e.min + ' | e.max: ' + e.max + ' | e.trigger: ' + e.trigger;
      //     }
      //   }
      // },

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

    Zoom.start(startDate, endDate, RANGE);

  });
