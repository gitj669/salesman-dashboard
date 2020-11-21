import React from 'react';
import { Container, Row, Col, Navbar, Modal, Button, Table } from 'react-bootstrap';
import isPlainObject from 'lodash/isPlainObject';
import {
  getOneCustomerInvDetailData,
  getCustomerData
} from '../../utils/networkUtils';
import { getUrlParams } from '../../utils/commonUtils';
import { PAGE_STATUS } from '../../constants';
import './index.scss';
import LoadingScreen from '../../components/loadingScreen';
import { isEmpty } from 'lodash';

export default class OneCustomerInvDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneCustomerInvData: null,
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
        getOneCustomerInvDetailData(customerKey),
        getCustomerData(customerKey)
      ]).then((values) => {
        this.setState({
          oneCustomerInvData: values[0],
          customerData: values[1],
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
      oneCustomerInvData
    } = this.state;
    if (!oneCustomerInvData || isEmpty(oneCustomerInvData)) {
      return null;
    }
    return (
      <Row>
        <Col md={12}>
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
          <div className="top-contacts">
            <Table striped bordered hover className="top-contacts-table">
              <tbody>
                {
                  oneCustomerInvData.map((contact, index) =>
                  {
                    return (
                    <tr key={index}>
                      <td>{contact.ITEM_NUMBER || ''}</td>
                      <td>{contact.DESCRIPTION || ''}</td>
                      <td>{contact.ONHAND}</td>
                      <td>{contact.ONE_CUST_WITH_REQ ? `$ ${contact.ONE_CUST_WITH_REQ}` : '$0'}</td>
                      <td>{contact.ONE_CUST_TOTAL ? `$ ${contact.ONE_CUST_TOTAL}` : '$0'}</td>
                    </tr>
                    )
                  }
                  )}
              </tbody>
            </Table>
          </div>
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