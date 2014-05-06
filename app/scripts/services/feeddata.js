'use strict';

angular.module('stockApp')
  .factory('feedData', function ($http, GOOGLE_FEED_API) {

    var NUM = '3';
    var VERSION = '1.0';
    var CALLBACK = 'JSON_CALLBACK';

    return function (url, num) {
      return $http.jsonp(
        GOOGLE_FEED_API +
        '?v=' + VERSION +
        '&num=' + (num || NUM) +
        '&q=' + url +
        '&callback=' + CALLBACK
      ).then(function (result) {
        angular.forEach(result.data.responseData.feed.entries, function (value) {
          value.publishedDate = new Date(Date.parse(value.publishedDate));
        });

        return result.data.responseData.feed;
      });
    };

  });
