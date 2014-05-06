'use strict';

angular.module('stockApp')
  .factory('FeedData', function ($http, GOOGLE_FEED_API, $filter) {

    var NUM = '5';
    var VERSION = '1.0'
    var CALLBACK = 'JSON_CALLBACK';
    var FEED_URL = 'http://www.heise.de/newsticker/heise-top-atom.xml';

    return function (url, num) {
      return $http.jsonp(
        GOOGLE_FEED_API +
        '?v=' + VERSION +
        '&num=' + (num || NUM) +
        '&q=' + url +
        '&callback=' + CALLBACK
      ).then(function (result) {
        angular.forEach(result.data.responseData.feed.entries, function (value) {
          value.publishedDate = new Date(Date.parse(value.publishedDate));;
        });

        return result.data.responseData.feed;
      });
    };

  });
