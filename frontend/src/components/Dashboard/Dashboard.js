import React, { Component } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FaCircle from 'react-icons/lib/fa/plus-circle';

// Components
import TopBar from '../TopBar/TopBar';

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
            <div>
              {this.state.clients.length ? (
                <h2>client comp</h2>
              ) : (
                <AddText>
                  <div>New Client</div>
                  <div>
                    <FaCircle />
                  </div>
                </AddText>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

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
