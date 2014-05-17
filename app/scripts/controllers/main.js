'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function (
    $filter,
    $interval,
    $scope,
    chartXAxis,
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

    $scope.slides = {
      title: '',
      entries: [
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
      StockData.get(value, startDateFiltered, endDateFiltered).then(function (data) {
        $scope.slides.entries[key].stockChartConfig.series = data;
        $scope.slides.entries[key].stockChartConfig.xAxis = chartXAxis;
        $scope.slides.entries[key].stockChartConfig.title.text = value.join(', ');
        $scope.slides.entries[key].stockChartConfig.loading = false;
      });
    });

    $scope.slides.title = titles.join(' - ');

    Zoom.start(startDate, endDate);

    $scope.stop = function () {
      Zoom.stop();
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


    /* common */

    // stop intervals on $scope destroy (route change)
    $scope.$on('$destroy', function () {
      Zoom.stop();
      $interval.cancel(feedInterval);
    });

  });
