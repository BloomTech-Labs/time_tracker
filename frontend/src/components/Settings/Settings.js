import React, { Component } from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FaCircle from 'react-icons/lib/fa/plus-circle';

// Components
import TopBar from '../TopBar/TopBar';

class Settings extends Component {
  state = {
    email: '',
    password: '',
    newPassword: '',
    type: ''
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.changePassword(this.state);
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
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
          <Col md="2" />
          <Col>
            <Form onSubmit={e => this.onSubmitHandler(e)}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={this.state.email}
                  placeholder="with a placeholder"
                  onChange={this.inputChangeHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={this.state.password}
                  placeholder="password placeholder"
                  onChange={this.inputChangeHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="newPassword">New Password</Label>
                <Input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={this.state.newPassword}
                  placeholder="new password placeholder"
                  onChange={this.inputChangeHandler}
                />
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend>Radio Buttons</legend>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="vendor"
                      onChange={this.inputChangeHandler}
                    />Vendor
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input
                      type="radio"
                      name="type"
                      value="client"
                      onChange={this.inputChangeHandler}
                    />Client
                  </Label>
                </FormGroup>
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
          <Col md="4"/>
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

export default Settings;
