import React from 'react';
import ReactHighcharts from 'react-highcharts';

ReactHighcharts.Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  },
});

const getConfig = (chartData) => {
  if (chartData) {
    const { series, title } = chartData;
    return {
      chart: {
        type: 'pie',
        height: 300
      },
      colors: ['#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
      legend: {
        enabled: true,
        symbolHeight: 11,
        symbolWidth: 25,
        squareSymbol: false,
        symbolRadius: 0
      },
      credits: {
        enabled: false
      },
      title: {
        text: title
      },
      series: [{
        ...series[0],
        dataLabels: {
          enabled: false
        }
      }]
    };
  }
  return null;
}

const PieChart = ({data}) => <ReactHighcharts config={getConfig(data)} />;

export default PieChart;