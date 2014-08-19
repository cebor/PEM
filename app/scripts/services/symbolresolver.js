'use strict';

angular.module('stockApp')
  .service('Symbolresolver', function Symbolresolver($http, $q, YAHOO_API) {

    function resolveSymbol(symbol) {

      var query = 'select * from yahoo.finance.quotes where symbol = "' + symbol + '"';

      // yql config
      var FORMAT = 'json';
      var ENV = 'store://datatables.org/alltableswithkeys';

      return $http.get(YAHOO_API + '?q=' + query + '&format=' + FORMAT + '&env=' + ENV)
        .then(function (data) {
          return data.data.query.results.quote.Name;
        });

    }

    this.resolve = function(input) {
      if (angular.isArray(input)) {
        var promises = [];
        angular.forEach(input, function (value) {
          promises.push(resolveSymbol(value));
        });

        return $q.all(promises);
      }

      return resolveSymbol(input);

    }
  });
