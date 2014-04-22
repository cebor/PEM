'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function ($scope, $q, StockData) {

    var promises = [];

    $scope.stockSymbols = [
      'YHOO',
      'MSFT',
      'KO'
    ];

    // get data for all symbols in stockSymbols[]
    angular.forEach($scope.stockSymbols, function (value, key) {

      promises[key] = StockData.get(value, '2013-09-01', '2014-03-31').then(function (data) {

        var serie = {
          name: value,
          data: data,
          tooltip: {
            valueDecimals: 2
          }
        };

        $scope.chartConfig.series.push(serie);

      });

    });

    // wait until all promises are resolved
    $q.all(promises).then(function () {
      $scope.chartConfig.loading = false;
    });

    // highcharts/highstock config
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
