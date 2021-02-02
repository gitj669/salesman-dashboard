import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Navbar, Modal, Button, Table } from 'react-bootstrap';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import isPlainObject from 'lodash/isPlainObject';
import {
  getCustomerData,
  getSalesByMonthDetailData
} from '../../utils/networkUtils';
import { getUrlParams, formatAsDollar, capitalizeFirstLetter } from '../../utils/commonUtils';
import { PAGE_STATUS } from '../../constants';
import LoadingScreen from '../../components/loadingScreen';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const SalesByMonthDetail = (props) => {
  const [salesDetail, setSalesDetail] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [pageStatus, setPageStatus] = useState(PAGE_STATUS.DEFAULT);
  const [errorMsgs, setErrorMsgs] = useState(null);
  let currentYear = moment().year();
  let history = useHistory();
  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };

  let gridApi = null;
  let gridColumnApi = null;

  const onGridReady = (params) => {
    gridApi = params.api;
    gridColumnApi = params.columnApi;
  }

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
          getSalesByMonthDetailData(customerKey),
          getCustomerData(customerKey)
        ]).then((values) => {
          setSalesDetail(values[0]);
          setCustomerData(values[1]);
          setErrorMsgs(setErrorsMsgs(values));
          setPageStatus(PAGE_STATUS.SUCCESS);
        });
      }
    })();
  }, []);

  const renderSuccessScreen = () => {
    const months = moment.monthsShort();
    const uppercaseMonths = months.map(month => month.toUpperCase());
    return (
      <Row>
        <Col md={12} className="chartWrapper">
          <Row>
            {salesDetail && salesDetail.length ?
              <Col md={12} className="ag-theme-alpine">
                <h5 className="text-center">{currentYear} Sales by Month</h5>
                <AgGridReact
                  onGridReady={onGridReady}
                  domLayout='autoHeight'
                  rowData={salesDetail}
                  defaultColDef={defaultColDef}
                  >
                  <AgGridColumn width={140} field="SALES_GROUP" headerName="Group"></AgGridColumn>
                {uppercaseMonths.map(month =>
                  <AgGridColumn
                    flex={1}
                    field={month}
                    headerName={capitalizeFirstLetter(month)}
                    valueFormatter={item => formatAsDollar(item.value || 0)}
                  />
                )}
                </AgGridReact>
              </Col> : null
            }
          </Row>
        </Col>
      </Row >
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

export default SalesByMonthDetail;
