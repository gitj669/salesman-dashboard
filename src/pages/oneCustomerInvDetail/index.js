import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Modal, Button, Table } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import isPlainObject from 'lodash/isPlainObject';
import {
  getOneCustomerInvDetailData,
  getCustomerData
} from '../../utils/networkUtils';
import { getUrlParams, sumOfKeyInArrObj, formatAsDollar } from '../../utils/commonUtils';
import { PAGE_STATUS } from '../../constants';
import LoadingScreen from '../../components/loadingScreen';
import { isEmpty } from 'lodash';

const OneCustomerInvDetail = (props) => {
  const [oneCustomerInvData, setCustomerInvData] = useState(null);
  const [pageStatus, setPageStatus] = useState(PAGE_STATUS.DEFAULT);
  const [errorMsgs, setErrorMsgs] = useState();
  const [customerData, setCustomerData] = useState();
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
          getOneCustomerInvDetailData(customerKey),
          getCustomerData(customerKey)
        ]).then((values) => {
          setCustomerInvData(values[0]);
          setCustomerData(values[1]);
          setErrorMsgs(setErrorsMsgs(values));
          setPageStatus(PAGE_STATUS.SUCCESS);
        });
      }
    })();
  }, []);

  const renderSuccessScreen = () => {
    if (!oneCustomerInvData || isEmpty(oneCustomerInvData)) {
      return null;
    }
    return (
      <Row>
        <Col md={12}>
          <h4 className="heading1">One Customer Inventory</h4>
          <Table striped bordered hover className="top-contacts-table">
            <thead>
              <tr>
                <th>Item Number</th>
                <th>Item Description</th>
                <th>Onhand</th>
                <th>$ w/ Requirements</th>
                <th>$ One Customer Inv</th>
              </tr>
            </thead>
          </Table>
          <div className="one-cust-detail">
            <Table striped bordered hover className="top-contacts-table">
              <tbody>
                {
                  oneCustomerInvData.map((contact, index) => {
                    return (
                      <tr key={index}>
                        <td>{contact.ITEM_NUMBER || ''}</td>
                        <td>{contact.DESCRIPTION || ''}</td>
                        <td>{contact.ONHAND}</td>
                        <td>{contact.ONE_CUST_WITH_REQ ? `$ ${formatAsDollar(contact.ONE_CUST_WITH_REQ)}` : '$ 0'}</td>
                        <td>{contact.ONE_CUST_TOTAL ? `$ ${formatAsDollar(contact.ONE_CUST_TOTAL)}` : '$ 0'}</td>
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
                <th colSpan={3}>TOTAL</th>
                <th>$ {formatAsDollar(sumOfKeyInArrObj(oneCustomerInvData, 'ONE_CUST_WITH_REQ'))}</th>
                <th>$ {formatAsDollar(sumOfKeyInArrObj(oneCustomerInvData, 'ONE_CUST_TOTAL'))}</th>
              </tr>
            </thead>
          </Table>
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

export default OneCustomerInvDetail;
