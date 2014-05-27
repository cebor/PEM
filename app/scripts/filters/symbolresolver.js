'use strict';

angular.module('stockApp')
  .filter('symbolResolver', function () {
    return function (input) {
      if(angular.isArray(input)) {
        var output = [];
        angular.forEach(input, function (value) {
          switch (value) {
            case "MSFT":
              output.push("Microsoft");
              break;
            case "KO":
              output.push("Coca-Cola");
              break;
            case "YHOO":
              output.push("Yahoo!");
              break;
            case "UNIA.AS":
              output.push("UNILEVER");
              break;
            case "GOOGL":
              output.push("Google");
              break;
            case "AAPL":
              output.push("Apple");
              break;
            case "NSU.DE":
              output.push("Audi AG");
              break;
            case "SSU.DE":
              output.push("Samsung");
              break;
            case "NTDOF":
              output.push("Nintendo");
              break;
            case "BMW.DE":
              output.push("BMW AG");
              break;
            case "SIE.DE":
              output.push("Siemens AG");
              break;
            case "DAI.DE":
              output.push("Daimler AG");
              break;
          }
        });
        return output;
      }
      else {
        switch (input) {
          case "MSFT":
            return "Microsoft";
            break;
          case "KO":
            return "Coca-Cola";
            break;
          case "YHOO":
            return "Yahoo!";
            break;
          case "UNIA.AS":
            return "UNILEVER";
            break;
          case "GOOGL":
            return "Google";
            break;
          case "AAPL":
            return "Apple";
            break;
          case "NSU.DE":
            return "Audi AG";
            break;
          case "SSU.DE":
            return "Samsung";
            break;
          case "NTDOF":
            return "Nintendo";
            break;
          case "BMW.DE":
            return "BMW AG";
            break;
          case "SIE.DE":
            return "Siemens AG";
            break;
          case "DAI.DE":
            return "Daimler AG";
            break;
        }
      }
    };
  });
