'use strict';

angular.module('stockApp')
  .value('PieChartConfig', function () {
    return {
      options: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: 'Stock Pie'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Stock share',
        data: [
          ['Apple', 45.0],
          ['Google', 26.8],
          {
            name: 'Chrome',
            y: 12.8,
            sliced: true,
            selected: true
          },
          ['Microsoft', 8.5],
          ['McDonalds', 6.2],
          ['Coca Cola', 0.7]
        ]
      }]
    };
  });
