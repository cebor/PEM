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
          text: 'Bitcoin Data'
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
