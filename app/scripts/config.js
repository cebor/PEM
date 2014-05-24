'use strict';

angular.module('stockApp')
  .constant('YAHOO_API', 'http://query.yahooapis.com/v1/public/yql')
  .constant('GOOGLE_FEED_API', 'http://ajax.googleapis.com/ajax/services/feed/load')
  .constant('BITCOIN_CSV', 'https://api.bitcoinaverage.com/history/USD/per_day_all_time_history.csv');
