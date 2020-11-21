import React from 'react';
import { Col, Table } from 'react-bootstrap';

const TopContactsTable = ({ data }) => {
  if (data && data.length) {
    return (
      <Col md={12}>
        <h4 className="heading1">Contacts</h4>
        <Table striped bordered hover className="top-contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Product Interests</th>
            </tr>
          </thead>
        </Table>
        <div className="top-contacts">
          <Table striped bordered hover className="top-contacts-table">
            <tbody>
              {
                data.map((contact, index) =>
                  <tr key={index}>
                    <td>{contact.NAME || ''}</td>
                    <td>{contact.TITLE || ''}</td>
                    <td>{contact.TARGET || ''}</td>
                  </tr>
                )}
            </tbody>
          </Table>
        </div>
      </Col>
    )
  }
  return null;
}

export default TopContactsTable;