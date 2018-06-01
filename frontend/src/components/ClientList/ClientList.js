import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

class ClientList extends Component {
  render() {
    return (
      <Row>
        {this.props.clients.map((client, i) => {
          return (
            <Link to={`/dashboard/clients/${client._id}`} key={i}>
              <ClientCard name={client.name} />
            </Link>
          );
        })}
      </Row>
    );
  }
}

const ClientCard = props => {
  return (
    <Col sm="6">
      <Card>
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
        </CardBody>
        <CardBody>
          <CardText>Add comments or description</CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

const mapStateToProps = state => {
  return {
    clients: state.userReducer.clients
  };
};

export default connect(mapStateToProps, null)(ClientList);
