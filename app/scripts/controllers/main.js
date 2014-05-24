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

    var startDateFiltered = $filter('date')(startDate, 'yyyy-MM-dd');
    var endDateFiltered = $filter('date')(endDate, 'yyyy-MM-dd');

    $scope.stockSliderConfig = {
      title: '',
      startDate: startDate,
      endDate: endDate,
      slides: [
        {
          text: 'Slide 1',
          type: 'chart',
          stockChartConfig: new StockChartConfig(),
          pieChartConfig: new PieChartConfig()
        },
        {
          text: 'Slide 2',
          type: 'chart',
          stockChartConfig: new StockChartConfig(),
          pieChartConfig: new PieChartConfig()
        }
      ]
    };

    var titles = [];
    angular.forEach(stockSymbols, function (value, key) {
      titles.push(value.join(', '));
      stockData.get(value, startDateFiltered, endDateFiltered).then(function (data) {
        $scope.stockSliderConfig.slides[key].stockChartConfig.series = data;
        $scope.stockSliderConfig.slides[key].stockChartConfig.xAxis = chartXAxis;
        $scope.stockSliderConfig.slides[key].stockChartConfig.title.text = value.join(', ');
        $scope.stockSliderConfig.slides[key].stockChartConfig.loading = false;
        $scope.stockSliderConfig.slides[key].pieChartConfig.series.push(stockData.getPie(data));
        $scope.stockSliderConfig.slides[key].pieChartConfig.loading = false;
      });
    });

    $scope.stockSliderConfig.title = titles.join(' - ');


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
