import React from 'react';
import { Container, Row, Col, Navbar, Modal, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import cloneDeep from 'lodash/cloneDeep';
import isPlainObject from 'lodash/isPlainObject';
import {
  getSalesCallByMonthData,
  getOrderEntryData,
  getAnnualizedSalesData,
  getSalesByMonthData,
  getOneCustomerInvData,
  getSalesBreakdownData,
  getS3SalesBreakdownData,
  getTopContactsData,
  getRecentActivityData,
  getCustomerData,
  getOneCustomerInvDetailData
} from '../../utils/networkUtils';
import {
  prepareDataForBarChart,
  prepareDataForAreaChart,
  prepareDataForLineChart,
  prepareDataForPieChart
} from '../../utils/chartUtils';
import { getUrlParams } from '../../utils/commonUtils';
import { API_NAMES, PAGE_STATUS } from '../../constants';
import BarChart from '../../components/charts/bar';
import AreaChart from '../../components/charts/area';
import LineChart from '../../components/charts/line';
import PieChart from '../../components/charts/pie';
import './index.scss';
import LoadingScreen from '../../components/loadingScreen';
import TopContactsTable from './topContacts';
import RecentActivity from './recentActivity';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.customerKey = 0;
    this.state = {
      salesByMonthData: null,
      salesCallByMonthData: null,
      orderEntryData: null,
      annualizedSalesData: null,
      oneCustomerInvData: null,
      salesBreakdownData: null,
      s3salesBreakdownData: null,
      topContactsData: null,
      customerData: null,
      pageStatus: PAGE_STATUS.DEFAULT
    };
  }

  async componentDidMount() {
    this.setState({
      pageStatus: PAGE_STATUS.LOADING
    });
    const params = getUrlParams(window.location.href);
    this.customerKey = params && params.customer_key;
    this.customerKey = parseInt(this.customerKey);
    if (this.customerKey) {
      Promise.all([
        getOrderEntryData(this.customerKey),
        getSalesCallByMonthData(this.customerKey),
        getAnnualizedSalesData(this.customerKey),
        getSalesByMonthData(this.customerKey),
        getOneCustomerInvData(this.customerKey),
        getSalesBreakdownData(this.customerKey),
        getS3SalesBreakdownData(this.customerKey),
        getTopContactsData(this.customerKey),
        getRecentActivityData(this.customerKey),
        getCustomerData(this.customerKey),
        getOneCustomerInvDetailData(this.customerKey)
      ]).then((values) => {
        this.setState({
          orderEntryData: prepareDataForBarChart(values[0], API_NAMES.orderEntry),
          salesCallByMonthData: prepareDataForBarChart(values[1], API_NAMES.salesCallByMonth),
          annualizedSalesData: prepareDataForAreaChart(values[2], API_NAMES.annualizedSales),
          salesByMonthData: prepareDataForLineChart(values[3], API_NAMES.salesByMonth),
          oneCustomerInvData: prepareDataForLineChart(values[4], API_NAMES.oneCustomerInv),
          salesBreakdownData: prepareDataForPieChart(values[5], API_NAMES.salesBreakDown),
          s3salesBreakdownData: prepareDataForPieChart(values[6], API_NAMES.s3salesBreakdown),
          topContactsData: values[7],
          recentActivityData: values[8],
          customerData: values[9],
          errorMsgs: this.setErrorsMsgs(values),
          pageStatus: PAGE_STATUS.SUCCESS
        });
      });
    }
  }

  setErrorsMsgs = apiResponses => {
    const errorMsgs = [];
    if (apiResponses && apiResponses.length) {
      apiResponses.forEach(res => {
        if (isPlainObject(res) && res.errorMsg) {
          errorMsgs.push(<>
            <p>{`${res.sourceName}: ${res.errorLocation}`}</p>
            <p>{res.errorMsg}</p>
          </>);
        }
      });
    }
    return errorMsgs;
  }

  getBarChartData = (apiName) => {
    const { orderEntryData, salesCallByMonthData } = this.state;
    let chartData;
    if (apiName === API_NAMES.orderEntry) {
      chartData = cloneDeep(orderEntryData);
    }
    if (apiName === API_NAMES.salesCallByMonth) {
      chartData = cloneDeep(salesCallByMonthData);
    }
    return chartData;
  }

  renderSuccessScreen = () => {
    const {
      salesCallByMonthData,
      salesByMonthData,
      orderEntryData,
      annualizedSalesData,
      oneCustomerInvData,
      salesBreakdownData,
      s3salesBreakdownData,
      topContactsData,
      recentActivityData
    } = this.state;
    return (
      <Row>
        <Col md={8} className="chartWrapper">
          <Row>
            {salesCallByMonthData ?
              <Col md={6} className="chartWrapper">
                <BarChart data={this.getBarChartData(API_NAMES.salesCallByMonth)} />
              </Col> : null
            }
            {orderEntryData ?
              <Col md={6} className="chartWrapper">
                <BarChart data={this.getBarChartData(API_NAMES.orderEntry)} />
              </Col> : null
            }
            {salesByMonthData ?
              <Col md={6} className="chartWrapper">
                <LineChart data={salesByMonthData} />
              </Col> : null
            }
            {oneCustomerInvData ?
              <Link to={`/oneCustomerInvDetail?customer_key=${this.customerKey}`} target="_blank">
                <Col md={6} className="chartWrapper">
                  <LineChart data={oneCustomerInvData} />
                </Col>
              </Link> : null
            }
            {salesBreakdownData ?
              <Link to={`/salesBreakdownDetail?customer_key=${this.customerKey}`} target="_blank">
                <Col md={6} className="chartWrapper">
                  <PieChart data={salesBreakdownData} />
                </Col>
              </Link> : null
            }
            {s3salesBreakdownData ?
              <Link to={`/s3SalesBreakdownDetail?customer_key=${this.customerKey}`} target="_blank">
                <Col md={6} className="chartWrapper">
                  <PieChart data={s3salesBreakdownData} />
                </Col>
              </Link> : null
            }
          </Row>
        </Col>
        <Col md={4} className="chartWrapper">
          {annualizedSalesData ?
            <Col md={12} className="chartWrapper">
              <AreaChart data={annualizedSalesData} />
            </Col> : null
          }
          {recentActivityData && recentActivityData.length ?
            <RecentActivity data={recentActivityData} /> : null
          }
          {topContactsData && topContactsData.length ?
            <TopContactsTable data={topContactsData} /> : null
          }
        </Col>
      </Row>
    )
  };

  hideErrorModal = () => {
    this.setState({
      errorMsgs: null
    });
  }

  renderErrorModal = () => {
    const { errorMsgs } = this.state;
    return (
      <Modal
        show={errorMsgs && errorMsgs.length}
        onHide={this.hideErrorModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p>Please email the error message below to DMS and wait to hear back from them before trying to use the page again</p>
          {errorMsgs.map(error => error)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.hideErrorModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  render() {
    const { pageStatus, customerData, errorMsgs } = this.state;
    const { NAME } = customerData || {};
    return (
      <>
        <Container>
          <Navbar>
            <Navbar.Brand className="logo-text">{NAME || ''} Dashboard</Navbar.Brand>
          </Navbar>
          {pageStatus === PAGE_STATUS.SUCCESS && this.renderSuccessScreen()}
          {pageStatus === PAGE_STATUS.LOADING && <LoadingScreen />}
          {errorMsgs && errorMsgs.length ? this.renderErrorModal() : null}
        </Container>
      </>
    );
  }
}