'use strict';

angular.module('stockApp')
  .controller('TestCtrl', function ($scope, StockData) {

    $scope.data = [];

    StockData.get('YHOO', '2013-09-01', '2014-03-31').then(function (data) {
      $scope.data = data;
    });

  });
