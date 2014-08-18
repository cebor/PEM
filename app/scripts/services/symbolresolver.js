'use strict';

angular.module('stockApp')
  .service('Symbolresolver', function Symbolresolver($http, YAHOO_API) {

    function resolveSymbol(symbol) {

      var query = 'select * from yahoo.finance.quotes where symbol = "'
        + symbol + '"';

      // yql config
      var FORMAT = 'json';
      var ENV = 'store://datatables.org/alltableswithkeys';


      $http.get(YAHOO_API + '?q=' + query + '&format=' + FORMAT + '&env=' + ENV).then(
        function (data) {
           console.log(data.data.query.results.quote.Name);
          //TODO no value is returned -> undefined error
          return data.data.query.results.quote.Name;
        });

      }



    this.resolve = function(input) {
      if (angular.isArray(input)) {
        var output = [];
        angular.forEach(input, function (value) {
          output.push(resolveSymbol(value));
        });

        return output;
      }

      return resolveSymbol(input);

    }
  });
