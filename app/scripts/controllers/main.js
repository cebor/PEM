'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function ($scope, StockData) {

    var symbols = [
      'YHOO',
      'MSFT',
      'KO'
    ];

    StockData.getAll(symbols, '2013-09-01', '2014-03-31').then(function (data) {
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

      title: {
        text: 'Stock Data'
      },

      series: [],

      useHighStocks: true,
      loading: true
    };

  });
