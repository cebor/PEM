'use strict';

angular.module('stockApp')
  .filter('symbolResolver', function () {

    function resolve(symbol) {
      switch (symbol) {
        case "MSFT":
          return "Microsoft";
        case "KO":
          return "Coca-Cola";
        case "YHOO":
          return "Yahoo!";
        case "UNIA.AS":
          return "UNILEVER";
        case "GOOGL":
          return "Google";
        case "AAPL":
          return "Apple";
        case "NSU.DE":
          return "Audi AG";
        case "SSU.DE":
          return "Samsung";
        case "NTDOF":
          return "Nintendo";
        case "BMW.DE":
          return "BMW AG";
        case "SIE.DE":
          return "Siemens AG";
        case "DAI.DE":
          return "Daimler AG";
        default:
          return symbol;
      }
    }

    return function (input) {
      if(angular.isArray(input)) {
        var output = [];
        angular.forEach(input, function (value) {
          output.push(resolve(value));
        });
        return output;
      }

      return resolve(input);
    };
  });
