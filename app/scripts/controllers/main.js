'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function (
    $filter,
    $interval,
    $scope,
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

    $scope.slides = [];
    $scope.slides.push({text: 'Slide 1', type: 'chart', chartConfig: new StockChartConfig()});
    $scope.slides.push({text: 'Slide 2', type: 'chart', chartConfig: new StockChartConfig()});

    angular.forEach(stockSymbols, function (value, key) {
      StockData.get(value, startDateFiltered, endDateFiltered).then(function (data) {
        $scope.slides[key].chartConfig.series = data;
        $scope.slides[key].chartConfig.loading = false;
      });
    });

    Zoom.start(startDate, endDate, RANGE);

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
