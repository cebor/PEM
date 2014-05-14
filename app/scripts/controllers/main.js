'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function (
    $filter,
    $interval,
    $scope,
    chartXAxis,
    Clock,
    feedData,
    feeds,
    PieChartConfig,
    StockChartConfig,
    StockData,
    stockSymbols,
    Zoom
  ) {

    /* stock ticker */

    var RANGE = 6;

    var startDate = new Date();
    var endDate = new Date();
    startDate.setMonth(startDate.getMonth() - RANGE);

    var startDateFiltered = $filter('date')(startDate, 'yyyy-MM-dd');
    var endDateFiltered = $filter('date')(endDate, 'yyyy-MM-dd');

    $scope.slides = [
      {text: 'Slide 1', type: 'chart', chartConfig: new StockChartConfig()},
      {text: 'Slide 2', type: 'chart', chartConfig: new StockChartConfig()}
    ];

    var titles = [];
    angular.forEach(stockSymbols, function (value, key) {
      titles.push(value.join(', '));
      StockData.get(value, startDateFiltered, endDateFiltered).then(function (data) {
        $scope.slides[key].chartConfig.series = data;
        $scope.slides[key].chartConfig.xAxis = chartXAxis;
        $scope.slides[key].chartConfig.title.text = value.join(', ');
        $scope.slides[key].chartConfig.loading = false;
      });
    });

    $scope.title = titles.join(' - ');

    Zoom.start(startDate, endDate);

    $scope.stop = function () {
      Zoom.stop();
    };


    /* pie */

    $scope.pie = {};
    $scope.pie.chartConfig = new PieChartConfig();


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


    /* clock */

    Clock.init();


    /* common */

    // stop intervals on $scope destroy (route change)
    $scope.$on('$destroy', function () {
      Zoom.stop();
      $interval.cancel(feedInterval);
    });

  });
