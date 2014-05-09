'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function ($scope, $filter, StockData, Zoom, feedData, $interval) {

    var symbolsChart1 = [
      'YHOO',
      'MSFT',
      'KO'
    ];

    var symbolsChart2 = [
      'GOOGL',
      'AAPL'
    ];

    var RANGE = 6;

    var startDate = new Date();
    var endDate = new Date();
    startDate.setMonth(startDate.getMonth() - RANGE);

    var startDateFiltered = $filter('date')(startDate, 'yyyy-MM-dd');
    var endDateFiltered = $filter('date')(endDate, 'yyyy-MM-dd');

    StockData.get(symbolsChart1, startDateFiltered, endDateFiltered).then(function (data) {
      $scope.slides[0].chartConfig.series = data;
      $scope.slides[0].chartConfig.loading = false;
    });
    StockData.get(symbolsChart2, startDateFiltered, endDateFiltered).then(function (data) {
      $scope.slides[1].chartConfig.series = data;
      $scope.slides[1].chartConfig.loading = false;
    });

    var slides = [];
    var globalChartConfig = function(){
      return {
      options: {
        chart: {
          type: 'line',
          zoomType: 'x'
        },
        navigator: {
          enabled: true
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
    }};

    slides.push({text: 'Slide 1', type: 'chart', chartConfig: globalChartConfig()});
    slides.push({text: 'Slide 2', type: 'chart', chartConfig: globalChartConfig()});
    $scope.slides = slides;


    Zoom.start(startDate, endDate, RANGE);

    $scope.stop = function () {
      Zoom.stop();
    };

    // stop zoom on $scope destroy (route change)
    $scope.$on('$destroy', function () {
      Zoom.stop();
    });


    /* news feed */

    var FEEDS = [
      'http://www.heise.de/newsticker/heise-top-atom.xml',
      'http://rss.golem.de/rss.php?feed=RSS2.0',
      'http://www.welt.de/?service=Rss',
      'http://newsfeed.zeit.de/digital/index'
    ];

    var feedIdx = 0;

    $interval(function () {
      feedData(FEEDS[feedIdx]).then(function (data) {
        $scope.feed = data;
        console.log(data);
      });
      feedIdx = (feedIdx + 1) % FEEDS.length;
    }, 7000);

  });
