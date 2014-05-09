'use strict';

angular.module('stockApp')
  .value('ChartConfig', function () {
    return {
      options: {
        chart: {
          type: 'line',
          zoomType: 'x'
        },
        navigator: {
          enabled: true
        },
        scrollbar: {
          enabled: false
        }
      },
      rangeSelector: {
        enabled: false
      },
      title: {
        text: 'Stock Data'
      },
      series: [],
      useHighStocks: true,
      loading: true
    };
  });
