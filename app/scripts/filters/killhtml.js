'use strict';

angular.module('stockApp')
  .filter('killHTML', function () {
    return function (input) {
      input = input.replace(/<(?:.|\n)*?>/gm, '');
      input = input.replace(/&[a-z]+;/gi, '');

      return input;
    };
  });
