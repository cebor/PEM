'use strict';

angular.module('stockApp')
  .controller('TestCtrl', function ($scope, $resource) {

    var url = 'http://query.yahooapis.com/v1/public/yql';
    var startDate = '2014-01-01';
    var endDate = '2014-04-01';
    var query = 'select * from yahoo.finance.historicaldata where symbol in ("YHOO","AAPL","GOOG","MSFT") and startDate = "' + startDate + '" and endDate = "' + endDate + '"';

    var ref = $resource(url + '?q=' + query + '&format=json&env=http://datatables.org/alltables.env');

    $scope.data = ref.get();

  });
