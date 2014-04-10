'use strict';

angular.module('stockApp')
  .factory('StockData', function ($http, YAHOO_API) {

    var startDate = '2014-01-01';
    var endDate = '2014-04-01';
    var query = 'select * from yahoo.finance.historicaldata where symbol in ("YHOO","AAPL","GOOG","MSFT") and startDate = "' + startDate + '" and endDate = "' + endDate + '"';


    var StockData = {

      get: function () {
        return $http.get(YAHOO_API + '?q=' + query + '&format=json&env=http://datatables.org/alltables.env');
      }

    };

    return StockData;

  });
