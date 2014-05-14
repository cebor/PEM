'use strict';

angular.module('stockApp')
  .value('StockChartConfig', function () {
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
        },
        rangeSelector: {
          enabled: false
        }
      },
      title: {
        text: 'Stock Data'
      },
      series: [],
      xAxis: {},
      useHighStocks: true,
      loading: true
    };
  });
