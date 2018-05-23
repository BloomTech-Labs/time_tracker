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
import { changePassword } from '../../store/action/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Settings extends Component {
  state = {
    email: '',
    password: '',
    newPassword: '',
    userType: '',
    user: ''
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.changePassword(
      this.state.password,
      this.state.newPassword,
      this.props.userType,
      this.props.user
    );
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  // @TODO: change to modal instead of alert
  componentDidUpdate() {
    if (this.props.changeSuccess) {
      alert('Changed password successfully.');
      this.props.history.push('/dashboard');
    }
  };

  render() {
    return (
      <div>
        <Row>
          <Col md="4" />
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
              <Button>Submit</Button>
            </Form>
          </Col>
          <Col md="4" />
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

const mapStateToProps = state => {
  return {
    userType: state.userReducer.userType,
    user: state.userReducer.user,
    changeSuccess: state.userReducer.changeSuccess
  };
};

export default withRouter(
  connect(mapStateToProps, { changePassword })(Settings)
);
