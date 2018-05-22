import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Col, Row } from 'reactstrap';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    type: ''
  };

  onSubmitHandler = event => {
    event.preventDefault();
    console.log('subit');
  };

  inputChangeHandler = ({ target }) => {
    console.log('radio changed');
    this.setState({
      [target.name]: target.value
    });
  };

  render() {
    return (
      <Row>
        <Col md="4" />
        <Col>
          <Form onSubmit={this.onSubmitHandler}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                value={this.state.name}
                placeholder="with a placeholder"
                onChange={this.inputChangeHandler}
              />
            </FormGroup>
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
        <Col md="4" />
      </Row>
    );
  }
}

export default SignUp;
