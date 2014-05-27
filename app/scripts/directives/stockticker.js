'use strict';

angular.module('stockApp')
  .directive('stockTicker', function (
    $filter,
    $timeout,
    chartXAxis,
    PieChartConfig,
    StockChartConfig,
    stockData,
    Zoom
  ) {
    return {
      replace: true,
      restrict: 'E',
      scope: {
        config: '='
      },
      templateUrl: 'views/stockticker.html',
      link: function (scope) {

        /* config */

        var startDate = scope.config.startDate;
        var endDate = scope.config.endDate;

        var stockStartDate = $filter('date')(startDate, 'yyyy-MM-dd');
        var stockEndDate = $filter('date')(endDate, 'yyyy-MM-dd');

        scope.slides = [];
        var titles = [];


        /* get data */

        angular.forEach(scope.config.symbols, function (value, key) {

          titles.push($filter('symbolResolver')(value).join(', '));

          var slide = {
            stockChartConfig: new StockChartConfig(),
            pieChartConfig: new PieChartConfig()
          };

          this[key] = slide;

          var that = this;

          stockData.get(value, stockStartDate, stockEndDate).then(function (data) {
            that[key].stockChartConfig.series = data;
            that[key].stockChartConfig.xAxis = chartXAxis;
            that[key].stockChartConfig.title.text = $filter('symbolResolver')(value).join(', ');
            that[key].stockChartConfig.loading = false;
            that[key].pieChartConfig.series.push(stockData.getPie(data));
            that[key].pieChartConfig.loading = false;
          });

        }, scope.slides);

        scope.title = titles.join(' - ');


        /* zoom */

        Zoom.start(startDate, endDate);

        scope.zoomStart = function () {
          $timeout(function () {
            Zoom.start(startDate, endDate);
          }, 3000);
        };

        scope.zoomStop = function () {
          Zoom.stop();
        };

        scope.$on('$destroy', function () {
          Zoom.stop();
        });

      }
    };
  });
