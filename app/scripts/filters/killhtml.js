'use strict';

angular.module('stockApp')
  /**
   * Filter: remove HTML tags
   * @param input String
   * @return String
   */
  .filter('killHTML', function () {
    return function (input) {
      input = input.replace(/<(?:.|\n)*?>/gm, '');
      input = input.replace(/&[a-z]+;/gi, '');

      return input;
    };
  });
