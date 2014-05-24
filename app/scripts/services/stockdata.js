'use strict';

angular.module('stockApp')
  .factory('stockData', function ($q, $http, YAHOO_API) {

    var stockData = {

      /**
       * get data from yahoo api
       * @param   args
       * @return  yql json object
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
       * get one data for highcharts
       * @param   args
       * @return  highcharts json object
       */
      getOne: function (symbol, startDate, endDate) {

        return this.yql(symbol, startDate, endDate).then(function (yql) {
          var array = [];

          // parse date and average stock price
          angular.forEach(yql.data.query.results.quote, function(value) {
            var date = Date.parse(value.Date);
            var price = parseFloat(value.Adj_Close); // jshint ignore:line

            this.push([date, price]);
          }, array);

          // highcharts serie config object
          var serie = {
            name: symbol,
            data: array.reverse(),
            tooltip: {
              valueDecimals: 2
            }
          };

          return serie;
        });

      },

      /**
       * get multiple data for highcharts
       * @param   args
       * @return  highcharts json objects array
       */
      get: function (symbols, startDate, endDate) {

        var that = this;

        var promises = [];

        angular.forEach(symbols, function (value, key) {
          promises[key] = that.getOne(value, startDate, endDate);
        });

        return $q.all(promises);

      },

      /**
       * get multiple data for piechart
       * calculate relations
       * @param   symbols, date of today
       * @return  highcharts json objects array
       */
       getPie: function (data) {
         var array = [];

         angular.forEach(data, function (value) {
           var name = value.name;
           // get latest price
           var price = value.data[value.data.length - 1][1];

           this.push([name, price]);
         }, array);

         var serie = {
           type: 'pie',
           name: 'Stock share',
           data: array
         };

         return serie;
       }

    };

    return stockData;

  });
