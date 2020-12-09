import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Navbar, Modal, Button, Table } from 'react-bootstrap';
import moment from 'moment';
import isPlainObject from 'lodash/isPlainObject';
import {
  getS3SalesBreakdownData,
  getCustomerData,
  getS3SalesBreakdownDetailData
} from '../../utils/networkUtils';
import {
  prepareDataForPieChart
} from '../../utils/chartUtils';
import { getUrlParams, formatAsDollar, sumOfKeyInArrObj } from '../../utils/commonUtils';
import { API_NAMES, PAGE_STATUS } from '../../constants';
import PieChart from '../../components/charts/pie';
import LoadingScreen from '../../components/loadingScreen';

const S3SalesBreakdownDetail = (props) => {
  const [currentYearData, setCurrentYearData] = useState(null);
  const [previousYearData, setPreviousYearData] = useState(null);
  const [salesBreakdownDetail, setSalesBreakdownDetail] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [pageStatus, setPageStatus] = useState(PAGE_STATUS.DEFAULT);
  const [errorMsgs, setErrorMsgs] = useState(null);
  let currentYear = moment().year();
  let history = useHistory();

  const setErrorsMsgs = apiResponses => {
    const updatedErrorMsgs = [];
    if (apiResponses && apiResponses.length) {
      apiResponses.forEach(res => {
        if (isPlainObject(res) && res.errorMsg) {
          updatedErrorMsgs.push(<>
            <p>{`${res.sourceName}: ${res.errorLocation}`}</p>
            <p>{res.errorMsg}</p>
          </>);
        }
      });
    }
    return updatedErrorMsgs;
  }

  useEffect(() => {
    (async () => {
      setPageStatus(PAGE_STATUS.LOADING);
      const { customerId } = props;
      let customerKey = customerId;
      if (!customerKey) {
        const params = getUrlParams(window.location.href);
        customerKey = params && params.customer_key;
        customerKey = parseInt(customerKey);
      }
      if (customerKey) {
        Promise.all([
          getS3SalesBreakdownData(customerKey, currentYear),
          getS3SalesBreakdownData(customerKey, (currentYear - 1)),
          getS3SalesBreakdownDetailData(customerKey),
          getCustomerData(customerKey)
        ]).then((values) => {
          setCurrentYearData(prepareDataForPieChart(values[0], API_NAMES.salesBreakDown));
          setPreviousYearData(prepareDataForPieChart(values[1], API_NAMES.salesBreakDown));
          setSalesBreakdownDetail(values[2]);
          setCustomerData(values[3]);
          setErrorMsgs(setErrorsMsgs(values));
          setPageStatus(PAGE_STATUS.SUCCESS);
        });
      }
    })();
  }, []);

  const renderSuccessScreen = () => {
    return (
      <Row>
        <Col md={12} className="chartWrapper">
          <Row>
            {previousYearData ?
              <Col md={6} className="chartWrapper">
                <PieChart data={previousYearData} />
              </Col> : null
            }
            {currentYearData ?
              <Col md={6} className="chartWrapper">
                <PieChart data={currentYearData} />
              </Col> : null
            }
            <Col md={12}></Col>
            {salesBreakdownDetail && salesBreakdownDetail.length ?
              <Col md={6}>
                <Table striped bordered hover className="top-contacts-table">
                  <thead>
                    <tr>
                      <th>Product Group</th>
                      <th>{currentYear - 1} Sales</th>
                      <th>{currentYear} Sales</th>
                      <th>{currentYear} Sales Annual</th>
                    </tr>
                  </thead>
                </Table>
                <div className="one-cust-detail">
                  <Table striped bordered hover className="top-contacts-table">
                    <tbody>
                      {
                        salesBreakdownDetail.map((contact, index) => {
                          return (
                            <tr key={index}>
                              <td>{contact.SALES_GROUP || ''}</td>
                              <td>{formatAsDollar(contact.PREVYR_SALES || 0)}</td>
                              <td>{formatAsDollar(contact.CURRYRSALES || 0)}</td>
                              <td>{formatAsDollar(contact.CURRYR_ANNUALIZED || 0)}</td>
                            </tr>
                          )
                        }
                        )}
                    </tbody>
                  </Table>
                </div>
                <Table striped bordered hover className="top-contacts-table footer">
                  <thead>
                    <tr>
                      <th>Total</th>
                      <th>{formatAsDollar(sumOfKeyInArrObj(salesBreakdownDetail, 'PREVYR_SALES'))}</th>
                      <th>{formatAsDollar(sumOfKeyInArrObj(salesBreakdownDetail, 'CURRYRSALES'))}</th>
                      <th>{formatAsDollar(sumOfKeyInArrObj(salesBreakdownDetail, 'CURRYR_ANNUALIZED'))}</th>
                    </tr>
                  </thead>
                </Table>
              </Col> : null
            }
          </Row>
        </Col>
      </Row>
    )
  };

  const renderErrorModal = () => {
    return (
      <Modal
        show={errorMsgs && errorMsgs.length}
        onHide={() => setErrorMsgs(null)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <p>Please email the error message below to DMS and wait to hear back from them before trying to use the page again</p>
          {errorMsgs.map(error => error)}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setErrorMsgs(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }

  const { NAME } = customerData || {};
  return (
    <>
      <Container>
        <Navbar>
          <Navbar.Brand className="logo-text">{NAME || ''} Dashboard</Navbar.Brand>
        </Navbar>
        <span className="go-back-btn" onClick={() => history.goBack()}>Return to Salesman Dashboard</span>
        {pageStatus === PAGE_STATUS.SUCCESS && renderSuccessScreen()}
        {pageStatus === PAGE_STATUS.LOADING && <LoadingScreen />}
        {errorMsgs && errorMsgs.length ? renderErrorModal() : null}
      </Container>
    </>
  );
}

export default S3SalesBreakdownDetail;
