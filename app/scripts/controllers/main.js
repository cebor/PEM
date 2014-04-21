'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function ($scope, StockData) {

    $scope.stockSymbols = [
      'YHOO'
    ];

    StockData.get($scope.stockSymbols[0], '2013-09-01', '2014-03-31').then(function (data) {

      var serie = {
        name: $scope.stockSymbols[0],
        data: data,
        tooltip: {
          valueDecimals: 2
        }
      };

      $scope.chartConfig.series.push(serie);
      $scope.chartConfig.loading = false;

    });

    $scope.chartConfig = {
      options: {
        chart: {
          type: 'line',
          zoomType: 'x'
        }
      },

      rangeSelector: {
        selected: 1
      },

      title: {
        text: 'Stock Data'
      },

      series: [],

      useHighStocks: true,
      loading: true
    };

  });
