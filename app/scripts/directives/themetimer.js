'use strict';

angular.module('stockApp')
  .directive('themeTimer', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var time = new Date();
        if(time.getHours() > 6 && time.getHours() < 21){
          console.log("daytime");
          element.remove();
        }
        else {
          console.log("nighttime");

        }
      }
    };
  });
