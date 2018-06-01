import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Input, FormGroup, Label, Button, Row, Col } from 'reactstrap';
import { withRouter } from 'react-router-dom';

const backend =
  process.env.NODE_ENV === 'production'
    ? `https://ls-time-tracker.herokuapp.com`
    : `http://localhost:5000`;

class TimestampDetail extends Component {
  state = {
    comments: '',
    startTime: '',
    endTime: '',
    clientName: '',
    duration: '',
    date: '',
    hours: '',
    minutes: ''
  };

  componentDidMount() {
    axios
      .get(`${backend}/timestamp/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState({
          comments: data.comments,
          startTime: data.startTime,
          endTime: data.endTime,
          clientName: data.client.name,
          duration: data.duration
        });
      })
      .then(data => {
        const splitDuration = this.state.duration.slice(0).split(':');
        this.setState({
          hours: splitDuration[0],
          minutes: splitDuration[1]
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  inputChangeHandler = ({ target }) => {
    this.setState({
      [target.name]: target.value
    });
  };

  editTimestamp = event => {
    event.preventDefault();
    const newDuration = `${this.state.hours}:${this.state.minutes}`;
    this.setState({ duration: newDuration });
    const newEndTime = moment(this.state.startTime)
      .add(Number(this.state.hours), 'hours')
      .add(Number(this.state.mins), 'minutes');

    axios
      .put(`${backend}/timestamp/${this.props.match.params.id}`, {
        newTimestamp: this.state,
        endTime: newEndTime,
        duration: newDuration
      })
      .then(updatedTStamp => {
        this.setState({
          comments: updatedTStamp.comments,
          endTime: updatedTStamp.endTime,
          duration: updatedTStamp.duration
        });
        alert('timestamp updated!');
        this.props.history.goBack();
        // add modal when updated successfully.
      })
      .catch(err => {
        console.log(err);
      });
  };

  // @TODO textarea auto expand?
  // @TODO Formatting forms so hours and minutes side-by-side
  render() {
    return (
      <div>
        <h1>{this.state.clientName}</h1>
        <h3>{this.state.date}</h3>
        <Row>
          <Col md="3" />
          <Col>
            <Form onSubmit={this.editTimestamp}>
              <FormGroup>
                <Label for="hours">Hours</Label> {/* Edit hours form*/}
                <Input
                  name="hours"
                  id="hours"
                  value={this.state.hours}
                  onChange={this.inputChangeHandler}
                  placeholder={this.state.hours}
                />
                {/* <Label for="minutes">Minutes</Label>
                <Input
                  name="minutes"
                  id="minutes"
                  value={this.state.minutes}
                  onChange={this.inputChangeHandler}
                  placeholder={this.state.minutes}
                /> */}
                <Label for="minutes">Minutes</Label> {/* Edit minutes select*/}
                <Input
                  type="select"
                  name="minutes"
                  id="minutes"
                  placeholder={this.state.minutes}
                  value={this.state.minutes}
                  onChange={this.inputChangeHandler}
                >
                  <option>00</option>
                  <option>15</option>
                  <option>30</option>
                  <option>45</option>
                </Input>
                <Label for="comments">Comments</Label> {/* Edit comments form*/}
                <Input
                  type="textarea"
                  name="comments"
                  id="comments"
                  placeholder="Type here.."
                  value={this.state.comments}
                  onChange={this.inputChangeHandler}
                />
              </FormGroup>
              <Button>Submit</Button>
            </Form>
          </Col>
          <Col md="3" />
        </Row>
      </div>
    );
  }
}

export default withRouter(TimestampDetail);
