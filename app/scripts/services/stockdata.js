'use strict';

angular.module('stockApp')
  .factory('StockData', function ($q, $http, YAHOO_API) {

    var StockData = {

      /**
      * get data from yahoo api
      * @params
      * @return
      */
      yql: function (symbol, startDate, endDate) {

        // yql query
        var query = 'select * from yahoo.finance.historicaldata' +
          ' where symbol = "' + symbol + '"' +
          ' and startDate = "' + startDate + '"' +
          ' and endDate = "' + endDate + '"';

        // yql config
        var FORMAT = 'json';
        var ENV = 'store://datatables.org/alltableswithkeys';

        return $http.get(YAHOO_API + '?q=' + query + '&format=' + FORMAT + '&env=' + ENV);

      },

      /**
      * get data for highcharts
      * @params
      * @return
      */
      get: function (symbol, startDate, endDate) {

        return this.yql(symbol, startDate, endDate).then(function (yql) {
          var array = [];

          // parse date and average stock price
          angular.forEach(yql.data.query.results.quote, function(value) {
            var date = new Date(value.Date).getTime();
            var price = parseFloat(value.Adj_Close); // jshint ignore:line

            this.push([date, price]);
          }, array);

          // highcharts config object
          var config = {
            name: symbol,
            data: array.reverse(),
            tooltip: {
              valueDecimals: 2
            }
          };

          return config;
        });

      },

      /**
      * get multiple data for highcharts
      * @params
      * @return
      */
      getAll: function (symbols, startDate, endDate) {

        var that = this;

        var promises = [];

        angular.forEach(symbols, function (value, key) {
          promises[key] = that.get(value, startDate, endDate);
        });

        return $q.all(promises);

      }

    };

    return StockData;

  });
