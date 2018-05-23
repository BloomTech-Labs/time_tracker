import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, FormText, Row, Col } from 'reactstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addClient } from '../../store/action/userActions';

class CreateClient extends Component {
  state = {
    email: '',
    user: ''
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.addClient(this.state.email, this.props.user);
  };

  render() {
    return (
      <Row>
        <Col md="4" />
        <Col>
          <StyledForm onSubmit={this.onSubmitHandler}>
            <StyledFormText>Client Name</StyledFormText>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="emial"
                placeholder="Client Email"
                value={this.state.email}
                onChange={this.inputChangeHandler}
              />
            </FormGroup>
            <Button>Submit</Button>
          </StyledForm>
        </Col>
        <Col md="4" />
      </Row>
    );
  }
}

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledFormText = styled(FormText)`
  font-size: 2em;
`;

const mapStateToProps = state => {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps, { addClient })(CreateClient);
