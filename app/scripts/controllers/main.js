'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function ($scope, StockData) {
    $scope.stockNames = [
      'YHOO'
    ];

    StockData.get($scope.stockNames[0], '2013-09-01', '2014-03-31').then(function (data) {
      $scope.toggleLoading = function () {
        this.chartConfig.loading = !this.chartConfig.loading;
      };

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
          text: $scope.stockNames[0]
        },
        series: [
          {
            name: $scope.stockNames[0],
            data: data,
            tooltip: {
              valueDecimals: 2
            }
          }
        ],

        useHighStocks: true,
        loading: false
      };
    });

  });
