import moment from 'moment';
import cloneDeep from 'lodash/cloneDeep';
const monthList = moment.monthsShort();

const barChartDefaultData = {
  orderEntry: {
    valueKeys: {
      xAxis: 'ORDER_ENTRY',
      goal: 'MONTHLY_ORDER_ENTRY_GOAL',
      average: 'AVERAGE_ORDER_ENTRY'
    },
    title: 'Order Entry',
    barColor: '#4E74BC',
    legends: [
      {
        label: 'OE',
        color: '#4E74BC',
        type: 'bar'
      }
    ]
  },
  salesCallByMonth: {
    valueKeys: {
      xAxis: 'SALES_CALL_BY_MONTH',
      goal: 'MONTHLY_SALES_CALL_GOAL',
      average: 'AVERAGE_MONTHLY_SALES_CALL'
    },
    title: 'Sales Call By Month',
    barColor: '#4E74BC',
    legends: [
      {
        label: 'Sales Call',
        color: '#4E74BC',
        type: 'bar'
      }
    ]
  },
  annualizedSales: {
    title: 'ANNUALIZED SALES'
  }
};

const prepareLegendsList = (data, apiName) => {
  const legendsList = [];
  const { legends } = barChartDefaultData[apiName];
  legendsList.push(...legends);
  // if (data.goal && data.goal.length) {
  //   legendsList.push({
  //     type: 'line',
  //     name: 'Goals',
  //     color: '#EC7E2E',
  //     marker: {
  //       enabled: false
  //     }
  //   });
  // }
  // if (data.average && data.average.length) {
  //   legendsList.push({
  //     type: 'line',
  //     name: 'Average',
  //     color: '#A6A6A6',
  //     marker: {
  //       enabled: false
  //     }
  //   });
  // }
  return legendsList;
}

export const prepareDataForBarChart = (apiData, apiName) => {
  let barChartData;
  const { title, barColor, valueKeys } = barChartDefaultData[apiName];
  const { xAxis, goal, average } = valueKeys;
  if (apiData && apiData.length) {
    barChartData = {};
    barChartData.xAxisList = [];
    barChartData.yAxisList = [];
    barChartData.goal = [];
    barChartData.average = [];
    apiData.forEach((item) => {
      barChartData.xAxisList.push(monthList[item.MONTH - 1]);
      barChartData.yAxisList.push(item[xAxis]);
      if (item[goal] && item[goal] > 0) {
        barChartData.goal.push(item[goal]);
      }
      if (item[average] && item[average] > 0) {
        barChartData.average.push(item[average]);
      }
    });
    barChartData.title = apiData.title || title;
    barChartData.barColor = apiData.barColor || barColor;
    barChartData.legends = cloneDeep(prepareLegendsList(barChartData, apiName));
  }
  return barChartData;
}

export const prepareDataForAreaChart = (apiData, apiName) => {
  let chartData;
  const { title } = barChartDefaultData[apiName];
  if (apiData && apiData.length) {
    chartData = {};
    chartData.xAxisList = [];
    chartData.yAxisList = [];
    chartData.yAxisBarList = [];
    apiData.forEach((item) => {
      chartData.xAxisList.push((monthList[item.MONTH - 1]));
      chartData.yAxisList.push(item.ANNUALIZED_SALES);
      chartData.yAxisBarList.push(item.TOTAL);
      if (!chartData.maxYAxis || chartData.maxYAxis < item.ANNUALIZED_SALES) {
        chartData.maxYAxis = item.ANNUALIZED_SALES;
      }
      if (!chartData.year) {
        chartData.year = item.YEAR;
      }
    });
    // chartData.yAxisBarList = Array(chartData.yAxisList.length).fill(chartData.maxYAxis);
    chartData.title = apiData.title || title;
  }
  return chartData;
}

export const prepareDataForLineChart = (apiData, apiName) => {
  let chartData;
  if (apiData) {
    const { title, series } = apiData;
    if (series && series.length) {
      chartData = {};
      chartData.xAxisList = [];
      chartData.series = [];
      chartData.maxNumber = 0;
      series.forEach((item) => {
        chartData.series.push({
          name: item.name,
          color: item.color,
          data: item.data.map(monthSale => {
            if (monthSale[2] > chartData.maxNumber) {
              chartData.maxNumber = monthSale[2];
            }
            return monthSale[2];
          }),
          marker: {
            enabled: false
          }
        });
      });
      series[0].data.forEach((item) => {
        chartData.xAxisList.push(item[1].toString())
      });
      chartData.title = title;
    }
  }
  return chartData;
}

export const prepareDataForPieChart = (apiData, apiName) => {
  return apiData && apiData.series && apiData.series.length ? apiData : null;
}
