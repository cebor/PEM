'use strict';

angular.module('stockApp')
  .controller('MainCtrl', function ($scope, $filter, StockData, Zoom, $http, $interval) {

    var symbols = [
      'YHOO',
      'MSFT',
      'KO'
    ];

    var RANGE = 6;

    var startDate = new Date();
    var endDate = new Date();
    startDate.setMonth(startDate.getMonth() - RANGE);

    var startDateFiltered = $filter('date')(startDate, 'yyyy-MM-dd');
    var endDateFiltered = $filter('date')(endDate, 'yyyy-MM-dd');

    StockData.get(symbols, startDateFiltered, endDateFiltered).then(function (data) {
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

      // xAxis: {
      //   range: 1 * 30 * 24 * 3600 * 1000,
      //   events: {
      //     setExtremes: function (e) {
      //       $scope.report = 'e.min: ' + e.min + ' | e.max: ' + e.max + ' | e.trigger: ' + e.trigger;
      //     }
      //   }
      // },

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

    Zoom.start(startDate, endDate, RANGE);

    $scope.stop = function () {
      Zoom.stop();
    };

    // stop zoom on $scope destroy (route change)
    $scope.$on('$destroy', function () {
      Zoom.stop();
    });


    var feedURL = [];
    //Heise newsticker
    feedURL.push('http://www.heise.de/newsticker/heise-top-atom.xml');
    //Golem newsticker
    feedURL.push('http://rss.golem.de/rss.php?feed=RSS2.0');
    //Die Welt newsticker
    feedURL.push('http://www.welt.de/?service=Rss');
    //Die Zeit newsticker
    feedURL.push('http://newsfeed.zeit.de/digital/index');
    var feedIndex = 0;

    $interval(function () {
      var URL = 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=3&callback=JSON_CALLBACK&q=' + feedURL[feedIndex];

      $http.jsonp(URL).
          success(function (data) {//Golem newsticker
            //var feedURL = 'http://rss.golem.de/rss.php?feed=RSS2.0';
            //Die Welt newsticker
            //var feedURL = 'http://www.welt.de/?service=Rss';
            //Die Zeit newsticker
            var feedURL = 'http://newsfeed.zeit.de/digital/index';
            var feed = data.responseData.feed;
            var feedList = [];
            var i = 0;

            for (i = i; i < feed.entries.length; i++) {
              var feedDate = new Date(Date.parse(feed.entries[i].publishedDate));
              feed.entries[i].publishedDate = $filter('date')(feedDate, 'dd.MM.yyyy @ HH:mm');
              feed.entries[i].content = feed.entries[i].content.replace(/<(?:.|\n)*?>/gm, '');
              feedList.push(feed.entries[i]);
            }

            $scope.feed = feed;
            $scope.feedList = feedList;
            console.log($scope.feed);
            // this callback will be called asynchronously
            // when the response is available
          });
      feedIndex = (feedIndex+1)%feedURL.length;
    }, 7000);


  });
