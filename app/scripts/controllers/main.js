'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function (
    $interval,
    $scope,
    bitcoinData,
    BitcoinChartConfig,
    feedData,
    feeds,
    stockSymbols
  ) {

    /* stock ticker */

    var RANGE = 6;

    var startDate = new Date();
    var endDate = new Date();
    startDate.setMonth(startDate.getMonth() - RANGE);

    $scope.stockTickerConfig = {
      symbols: stockSymbols,
      startDate: startDate,
      endDate: endDate
    };


    /* news feed */

    feedData(feeds[0]).then(function (data) {
      $scope.feed = data;
    });

    var feedIdx = 1;

    var feedInterval = $interval(function () {
      feedData(feeds[feedIdx]).then(function (data) {
        $scope.feed = data;
      });
      feedIdx = (feedIdx + 1) % feeds.length;
    }, 7000);


    /* bitcoins */

    $scope.bitcoin = {};
    $scope.bitcoin.chartConfig = new BitcoinChartConfig();

    bitcoinData.get().then(function (data) {
      $scope.bitcoin.chartConfig.series.push(data);
      var YEAR = 365 * 24 * 3600 * 1000;
      $scope.bitcoin.chartConfig.xAxis.currentMin = new Date().getTime() - YEAR;
      $scope.bitcoin.chartConfig.loading = false;
    });


    /* common */

    // stop intervals on $scope destroy (route change)
    $scope.$on('$destroy', function () {
      $interval.cancel(feedInterval);
    });

  });
