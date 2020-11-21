import React from 'react';
import ReactHighcharts from 'react-highcharts';

ReactHighcharts.Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  },
});

const getConfig = (chartData) => {
  if (chartData) {
    const { xAxisList, series, title, maxNumber } = chartData;
    const BAR_MAX_NUMBER = maxNumber;
    return {
      chart: {
        type: 'line',
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
        floor: 1,
        tickAmount: BAR_MAX_NUMBER > 7 ? Math.floor(BAR_MAX_NUMBER / (BAR_MAX_NUMBER / 7)) : BAR_MAX_NUMBER
      },
      xAxis: {
        categories: xAxisList
      },
      tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}'
      },
      series
    };
  }
  return null;
}

const LineChart = ({ data }) => <ReactHighcharts config={getConfig(data)} />;

// renderLineChart = () => {
//   return (
//     <Col md={4} className="chartWrapper">
//       <ReactHighcharts config={this.getLineChartConfig()} />
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

export default LineChart;