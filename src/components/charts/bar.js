import React from 'react';
import ReactHighcharts from 'react-highcharts';

ReactHighcharts.Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  },
});

const getConfig = (chartData) => {
  if (chartData) {
    const { xAxisList, yAxisList, title, goal, average } = chartData;
    const BAR_MAX_NUMBER = Math.max(...yAxisList, ...goal, ...average);
    return {
      chart: {
        type: 'column',
        height: 300
      },
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
      yAxis: {
        min: 0,
        max: BAR_MAX_NUMBER,
        title: {
          text: ''
        },
        stackLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'gray'
          }
        },
        floor: 0,
        tickAmount: BAR_MAX_NUMBER > 7 ? Math.floor(BAR_MAX_NUMBER / (BAR_MAX_NUMBER / 7)) : BAR_MAX_NUMBER
      },
      xAxis: {
        categories: xAxisList
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}'
      },
      series: chartData ? prepareSeries(chartData) : null
    };
  }
  return null;
}

const prepareSeries = (chartData) => {
  const { yAxisList, barColor, goal, average, legends } = chartData;
  const series = [
    {
      name: legends[0].label,
      data: yAxisList,
      zIndex: 0,
      color: barColor,
      zones: []
    }
  ];
  if (goal && goal.length) {
    series.push({
      type: 'line',
      name: 'Goal',
      data: goal,
      color: '#EC7E2E',
      marker: {
        enabled: false
      }
    });
  }
  const prevYear = new Date().getFullYear()-1;
  if (average && average.length) {
    series.push({
      type: 'line',
      name: `${prevYear} Average`,
      data: average,
      color: '#A6A6A6',
      marker: {
        enabled: false
      }
    });
  }
  return series;
}

const BarChart = ({data}) => <ReactHighcharts config={getConfig(data)} />;

// const BarChart = (data, apiName) => {
//   return (
//     <Col md={4} className="chartWrapper">
//       <ReactHighcharts config={this.getBarChartConfig(apiName)} />
//       {data.legends && data.legends.length ?
//         <ul className="chartLegends">
//           {data.legends.map((item) =>
//             <li>
//               <span className={item.type} style={{ backgroundColor: item.color }}></span>
//               {item.label}
//             </li>
//           )}
//         </ul> : null
//       }
//     </Col>
//   );
// }

export default BarChart;
