'use strict';

angular.module('stockApp')
  .factory('StockData', function ($q, $http, YAHOO_API) {

    var StockData = {

      get: function (stockSymbol, startDate, endDate) {

        // yql query
        var query = 'select * from yahoo.finance.historicaldata' +
          ' where symbol = "' + stockSymbol + '"' +
          ' and startDate = "' + startDate + '"' +
          ' and endDate = "' + endDate + '"';

        // yql config
        var FORMAT = 'json';
        var ENV = 'store://datatables.org/alltableswithkeys';

        var deferred = $q.defer();

        // get data from yahoo api
        $http.get(YAHOO_API + '?q=' + query + '&format=' + FORMAT + '&env=' + ENV)
          .success(function (data) {

            var array = [];

            // pick data for highcharts
            angular.forEach(data.query.results.quote, function(value) {

              // parse date and average stock price
              var date = new Date(value.Date).getTime();
              var price = parseFloat(value.Adj_Close); // jshint ignore:line

              this.push([date, price]);

            }, array);

            deferred.resolve(array.reverse());

          });

        return deferred.promise;
      }

    };

    return StockData;

  });
