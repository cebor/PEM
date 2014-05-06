'use strict';

angular.module('stockApp')
  .filter('killHTML', function () {
    return function (input) {
      return input.replace(/<(?:.|\n)*?>/gm, '');
    };
  });
