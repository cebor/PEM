'use strict';

angular.module('stockApp')
  .factory('StockData', function ($q, $http, YAHOO_API) {

    var StockData = {

      get: function (stock, startDate, endDate) {

        // data query
        var query = 'select * from yahoo.finance.historicaldata' +
          ' where symbol in' +
          ' ("' + stock + '")' +
          ' and startDate = "' + startDate + '"' +
          ' and endDate = "' + endDate + '"';

        // yql config
        var format = 'json';
        var env = 'store://datatables.org/alltableswithkeys';

        var deferred = $q.defer();

        // get data from yahoo api
        $http.get(YAHOO_API + '?q=' + query + '&format=' + format + '&env=' + env)
          .success(function (data) {

            var array = [];

            // modify data for highcharts
            angular.forEach(data.query.results.quote, function(value) {

              var date = new Date(value.Date).getTime();
              var avg = parseFloat(value.Adj_Close); // jshint ignore:line

              this.push([date, avg]);

            }, array);

            deferred.resolve(array.reverse());

          });

        return deferred.promise;
      }

    };

    return StockData;

  });
