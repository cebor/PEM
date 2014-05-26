'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function (
    $filter,
    $interval,
    $scope,
    chartXAxis,
    bitcoinData,
    BitcoinChartConfig,
    feedData,
    feeds,
    PieChartConfig,
    StockChartConfig,
    stockData,
    stockSymbols
  ) {

    /* stock ticker */

    var RANGE = 6;

    var startDate = new Date();
    var endDate = new Date();
    startDate.setMonth(startDate.getMonth() - RANGE);

    var stockStartDate = $filter('date')(startDate, 'yyyy-MM-dd');
    var stockEndDate = $filter('date')(endDate, 'yyyy-MM-dd');

    $scope.stockSliderConfig = {
      startDate: startDate,
      endDate: endDate,
      slides: []
    };

    var stockTitles = [];

    angular.forEach(stockSymbols, function (value, key) {

      stockTitles.push(value.join(', '));

      var slide = {
        stockChartConfig: new StockChartConfig(),
        pieChartConfig: new PieChartConfig()
      };

      this.slides[key] = slide;

      var that = this;

      stockData.get(value, stockStartDate, stockEndDate).then(function (data) {
        that.slides[key].stockChartConfig.series = data;
        that.slides[key].stockChartConfig.xAxis = chartXAxis;
        that.slides[key].stockChartConfig.title.text = value.join(', ');
        that.slides[key].stockChartConfig.loading = false;
        that.slides[key].pieChartConfig.series.push(stockData.getPie(data));
        that.slides[key].pieChartConfig.loading = false;
      });

    }, $scope.stockSliderConfig);

    $scope.stockSliderConfig.title = stockTitles.join(' - ');


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
      var year = 365 * 24 * 3600 * 1000;
      $scope.bitcoin.chartConfig.xAxis.currentMin = new Date().getTime() - year;
      $scope.bitcoin.chartConfig.loading = false;
    });


    /* common */

    // stop intervals on $scope destroy (route change)
    $scope.$on('$destroy', function () {
      $interval.cancel(feedInterval);
    });

  });
