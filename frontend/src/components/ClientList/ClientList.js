import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

import { connect } from 'react-router-dom';

class ClientList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row>
        {this.props.clients.map(client => {
          <ClientCard key={client._id} />;
        })}
      </Row>
    );
  }
}

// const ClientCard = (props) => {
//   <Col md="6">
//     <h3>{props.name}</h3>
//     <p>Comment section</p>
//   </Col>
// }

export default ClientList;
