'use strict';

angular.module('stockApp')
  .value('BitcoinChartConfig', function() {
    return {
      options: {
        chart: {
          type: 'area',
          zoomType: 'x'
        },
        title: {
          text: false
        },
        scrollbar: {
          enabled: false
        },
        rangeSelector: {
          enabled: false
        }
      },
      series: [],
      useHighStocks: true,
      loading: true
    };
  });
