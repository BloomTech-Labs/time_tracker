import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

const backend = process.env.BASE_URL || 'http://localhost:5000';

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
        })
      })
      .catch(err => {
        console.log(err);
      });
  }

  // @TODO Adding comments form
  // @TODO Edit duration
  render() {
    return (
      <div>
        <h1>{this.state.clientName}</h1>
        <h3>{this.state.date}</h3>
        <p>{this.state.duration}</p>
        <p>COMMENTS</p>
      </div>
    );
  }
}

export default TimestampDetail;
