'use strict';

angular.module('stockApp')
  .factory('bitcoinData', function ($http, YAHOO_API, BITCOIN_CSV) {

    var bitcoinData = {
      yql: function () {

        var query = 'select * from csv where url = "' + BITCOIN_CSV + '"';

        // yql config
        var FORMAT = 'json';
        var ENV = 'store://datatables.org/alltableswithkeys';

        return $http.get(YAHOO_API + '?q=' + query + '&format=' + FORMAT + '&env=' + ENV);

      },

      get: function () {

        return this.yql().then(function (yql) {
          var array = [];

          var i = 0;

          angular.forEach(yql.data.query.results.row, function (value) {
            if (i++ > 0) {
              var date = new Date(value.col0.replace(/-/g, '/')).getTime();
              var price = parseFloat(value.col3);

              this.push([date, price]);
            }
          }, array);

          var serie = {
            name: 'Bitcoin in USD',
            color: '#A80000',
            data: array,
            tooltip: {
              valueDecimals: 2
            }
          };

          return serie;
        });

      }
    };

    return bitcoinData;

  });
