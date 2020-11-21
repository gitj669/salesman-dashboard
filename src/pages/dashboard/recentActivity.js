import React from 'react';
import { Col, Table } from 'react-bootstrap';

const RecentActivity = ({ data }) => {
  return (
    <Col md={12} className="recent-activities">
      <h4 className="heading1">Recent Activity</h4>
      <Table striped bordered hover className="top-contacts-table">
        <tbody>
          {
            data.map((activity, index) =>
              <tr key={index}>
                <td dangerouslySetInnerHTML={{ __html: activity.MSG }}></td>
              </tr>
            )
          }
        </tbody>
      </Table>
      {/* {
        data.map(activity =>
          <div dangerouslySetInnerHTML={{ __html: activity.MSG }}></div>
        )
      } */}
    </Col>
  )
};

export default RecentActivity;