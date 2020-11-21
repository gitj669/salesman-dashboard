import React from 'react';
import { Container, Row, Col, Navbar, Modal, Button, Table } from 'react-bootstrap';
import moment from 'moment';
import isPlainObject from 'lodash/isPlainObject';
import {
  getSalesBreakdownData,
  getCustomerData,
  getSalesBreakdownDetailData
} from '../../utils/networkUtils';
import {
  prepareDataForPieChart
} from '../../utils/chartUtils';
import { getUrlParams } from '../../utils/commonUtils';
import { API_NAMES, PAGE_STATUS } from '../../constants';
import PieChart from '../../components/charts/pie';
import './index.scss';
import LoadingScreen from '../../components/loadingScreen';

export default class SalesBreakdownDetail extends React.Component {
  constructor(props) {
    super(props);
    this.currentYear = moment().year();
    this.state = {
      currentYearData: null,
      previousYearData: null,
      salesBreakdownDetail: null,
      pageStatus: PAGE_STATUS.DEFAULT
    };
  }

  async componentDidMount() {
    this.setState({
      pageStatus: PAGE_STATUS.LOADING
    });
    const { customerId } = this.props;
    let customerKey = customerId;
    if (!customerKey) {
      const params = getUrlParams(window.location.href);
      customerKey = params && params.customer_key;
      customerKey = parseInt(customerKey);
    }
    if (customerKey) {
      Promise.all([
        getSalesBreakdownData(customerKey),
        getSalesBreakdownData(customerKey, (this.currentYear - 1)),
        getSalesBreakdownDetailData(customerKey),
        getCustomerData(customerKey)
      ]).then((values) => {
        this.setState({
          currentYearData: prepareDataForPieChart(values[0], API_NAMES.salesBreakDown),
          previousYearData: prepareDataForPieChart(values[1], API_NAMES.salesBreakDown),
          salesBreakdownDetail: values[2],
          customerData: values[3],
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

  renderSuccessScreen = () => {
    const {
      currentYearData,
      previousYearData,
      salesBreakdownDetail
    } = this.state;
    return (
      <Row>
        <Col md={12} className="chartWrapper">
          <Row>
            {currentYearData ?
              <Col md={6} className="chartWrapper">
                <PieChart data={currentYearData} />
              </Col> : null
            }
            {previousYearData ?
              <Col md={6} className="chartWrapper">
                <PieChart data={previousYearData} />
              </Col> : null
            }
            {salesBreakdownDetail && salesBreakdownDetail.length ?
              <Col md={6}>
                <Table striped bordered hover className="top-contacts-table">
                  <thead>
                    <tr>
                      <th>Product Group</th>
                      <th>{this.currentYear - 1} Sales</th>
                      <th>{this.currentYear} Sales</th>
                      <th>{this.currentYear} Sales Annual</th>
                    </tr>
                  </thead>
                </Table>
                <div className="top-contacts">
                  <Table striped bordered hover className="top-contacts-table">
                    <tbody>
                      {
                        salesBreakdownDetail.map((contact, index) => {
                          return (
                            <tr key={index}>
                              <td>{contact.SALES_GROUP || ''}</td>
                              <td>{contact.PREVYR_SALES || 0}</td>
                              <td>{contact.CURRYRSALES || 0}</td>
                              <td>{contact.CURRYR_ANNUALIZED|| 0}</td>
                            </tr>
                          )
                        }
                        )}
                    </tbody>
                  </Table>
                </div>
              </Col> : null
            }
          </Row>
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