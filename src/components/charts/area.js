import React from 'react';
import ReactHighcharts from 'react-highcharts';

ReactHighcharts.Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  },
});

const getConfig = (chartData) => {
  if (chartData) {
    const { xAxisList, yAxisList, title, year, yAxisBarList } = chartData;
    const BAR_MAX_NUMBER = Math.max(...yAxisList, ...yAxisBarList);
    return {
      lang: {
        thousandsSep: ','
      },
      chart: {
        type: 'area',
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
      series: [
        {
          name: `${year} Potential`,
          data: yAxisBarList,
          color: '#E4E4E4',
          marker: {
            enabled: false
          }
        },
        {
          name: 'Annualized sales',
          data: yAxisList,
          zIndex: 0,
          color: '#E3B090',
          marker: {
            enabled: false
          }
        }
      ]
    };
  }
  return null;
}

const AreaChart = ({ data }) => <ReactHighcharts config={getConfig(data)} />;

// renderAreaChart = (data, apiName) => {
//   return (
//     <Col md={4} className="chartWrapper">
//       <ReactHighcharts config={this.getAreaChartConfig(apiName)} />
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

export default AreaChart;