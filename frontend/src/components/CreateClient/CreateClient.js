import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col
} from 'reactstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';

class CreateClient extends Component {
  state = {
    email: ''
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    // add redux handler here
    // this.props.addClient(this.state.email)
  };

  render() {
    return (
      <Row>
        <Col md="4" />
        <Col>
          <StyledForm>
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

export default connect(null, null)(CreateClient);
