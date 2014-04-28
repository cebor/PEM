'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function ($scope, $timeout, $interval, StockData) {

    var symbols = [
      'YHOO',
      'MSFT',
      'KO'
    ];

    var startDate = ['2013', '09', '01'];
    var endDate = ['2014', '03', '31'];

    var startRange = 1;
    var zoomSpeed = 5;

    var dateArrayToString = function (dateArray) {
      return dateArray[0] + '-' + dateArray[1] + '-' + dateArray[2];
    };

    StockData.get(symbols, dateArrayToString(startDate), dateArrayToString(endDate)).then(function (data) {
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
        range: startRange * 30 * 24 * 3600 * 1000,
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
    $interval(function () {
      $timeout(function () {
        var i = -30 * startRange;
        $interval(function () {
          if (i >= -30 * 3 * startRange) {
            i -= zoomSpeed;
            Highcharts.charts[0].xAxis[0].setExtremes(
              Date.UTC(parseInt(endDate[0]), parseInt(endDate[1]), i),
              Date.parse(dateArrayToString(endDate)),
              true,
              false
            );
          }
        }, 1);
      }, 3000);

      $timeout(function () {
        Highcharts.charts[0].xAxis[0].setExtremes(
          0,
          Date.parse(dateArrayToString(endDate)),
          true,
          true
        );
      }, 10000);

      $timeout(function () {
        var i = parseInt(startDate[2]);
        $interval(function () {
          if (i <= 150) {
            i += zoomSpeed;
            Highcharts.charts[0].xAxis[0].setExtremes(
              Date.UTC(parseInt(startDate[0]), parseInt(startDate[1]), i),
              Date.parse(dateArrayToString(endDate)),
              true,
              false
            );
          }
        }, 1);
      }, 15000);
    },15000);
  });
