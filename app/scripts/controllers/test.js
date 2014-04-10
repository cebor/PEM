'use strict';

angular.module('stockApp')
  .controller('TestCtrl', function ($scope, StockData) {

    $scope.data = [];

    StockData.get()
      .success(function (data) {
        $scope.data = data.query.results.quote;
      })
      .error(function () {
        // TODO
        console.error('HTTP ERROR!');
      });

  });
