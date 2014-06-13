'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('stockApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('Test Main Controller', function () {
    expect(scope.stockTickerConfig.symbols)
      .toEqual([
        [
          'YHOO',
          'MSFT',
          'KO',
          'UNIA.AS'
        ],
        [
          'GOOGL',
          'AAPL',
          'NSU.DE',
          'SSU.DE'
        ],
        [
          'NTDOF',
          'BMW.DE',
          'SIE.DE',
          'DAI.DE'
        ]
      ]);
  });
});
