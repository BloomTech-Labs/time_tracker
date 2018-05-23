import React, { Component } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { Link, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import FaCircle from 'react-icons/lib/fa/plus-circle';

// Components
import TopBar from '../TopBar/TopBar';
import CreateClient from '../CreateClient/CreateClient';

class Dashboard extends Component {
  state = {
    clients: []
  };

  render() {
    return (
      <div>
        <TopBar />
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="#">Home</a>
          </BreadcrumbItem>
          <BreadcrumbItem active>Clients</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col md="2">
            <StyledMenu>
              <div>
                <Link to="#">Clients</Link>
              </div>
              <div>
                <Link to="#">Billing</Link>
              </div>
              <div>
                <Link to="#">Settings</Link>
              </div>
            </StyledMenu>
          </Col>
          <Col>
            <Switch>
              <Route path={'/dashboard/client/new'} component={CreateClient} />
              <Route
                path={'/dashboard'}
                component={mainDash}
                clients={this.state.clients}
              />
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

const mainDash = props => {
  return (
    <div>
      <AddText>
        <div>New Client</div>
        <div>
          <Link to="dashboard/client/new">
            <FaCircle />
          </Link>
        </div>
      </AddText>
    </div>
  );
};

const StyledMenu = styled.div`
  border: 1px black;
  border-style: inset;
  background-color: rgb(242, 242, 243);
  @media (min-width: 768px) {
    min-height: 60vh;
  }
`;

const AddText = styled.div`
  padding-top: 15vh;
  font-size: 4em;
`;

export default Dashboard;
