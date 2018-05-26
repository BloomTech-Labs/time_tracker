import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Form, Input, FormGroup, Label, Button, Row, Col } from 'reactstrap';

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
    date: ''
  };

  componentDidMount() {
    axios
      .get(`${backend}/timestamp/${this.props.match.params.id}`)
      .then(({ data }) => {
        this.setState({
          comments: data.comments,
          startTime: data.startTime,
          endTime: data.endTime,
          clientName: data.client.name
        });
      })
      .then(timestamp => {
        const start = moment(this.state.startTime);
        const end = moment(this.state.endTime);
        const duration = moment.duration(end.diff(start));
        this.setState({
          duration: moment(duration._data).format('HH:mm:ss'),
          date: start.format('MM/DD/YYYY')
        });
        console.log('duration data: ', duration._data);
      })
      .then(time => {
        console.log(this.state.duration);
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
    console.log('edit timestamp');
    axios
      .put(`${backend}/timestamp/${this.props.match.params.id}`, {
        newTimestamp: this.state
      })
      .then(updatedTStamp => {
        this.setState({
          comments: updatedTStamp.comments,
          endTime: updatedTStamp.endTime
        });
        // add modal when updated successfully.
      })
      .catch(err => {
        console.log(err);
      });
  };

  // duration editing
  // hours: minute: seconds
  // editing time 12hours => 8 hours
  // take ending time find difference to logged time.
  // subtract difference from endTime in timestamp.

  // @TODO Adding comments form
  // @TODO Edit duration
  // @TODO textarea auto expand?
  render() {
    return (
      <div>
        <h1>{this.state.clientName}</h1>
        <h3>{this.state.date}</h3>
        <Form>
          <Input value={this.state.duration} />
        </Form>
        <Row>
          <Col md="3" />
          <Col>
            <Form onSubmit={this.editTimestamp}>
              <FormGroup>
                <Label for="comments">Comments</Label>
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

export default TimestampDetail;
