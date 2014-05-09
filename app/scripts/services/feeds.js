'use strict';

angular.module('stockApp')
  .value('feeds', [
    'http://www.heise.de/newsticker/heise-top-atom.xml',
    'http://rss.golem.de/rss.php?feed=RSS2.0',
    'http://www.welt.de/?service=Rss',
    'http://newsfeed.zeit.de/digital/index'
  ]);
