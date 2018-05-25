import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PlayIcon from 'react-icons/lib/fa/play';
import StopIcon from 'react-icons/lib/fa/stop';
import styled from 'styled-components';
import moment from 'moment';
import {
  startNewTimer,
  stopActiveTimer
} from '../../store/action/timestampActions';
import TimestampDetail from '../TimestampDetail/TimestampDetail';

const backend = process.env.BASE_URL || 'http://localhost:5000';

class VendorClientPage extends Component {
  state = {
    name: '',
    user: '',
    hoursLogged: [],
    invoices: [],
    activeTimer: false,
    activeTimerId: '',
    timer: ''
  };

  componentDidMount() {
    this.getClient();
  }

  getClient = () => {
    const id = this.props.match.params.id;
    axios
      .get(`${backend}/vendor/client/${id}`)
      .then(({ data }) => {
        this.setState({
          name: data.name,
          hoursLogged: data.hoursLogged,
          invoices: data.invoices
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.activeTimer !== prevProps.activeTimer &&
      this.props.activeTimer === true
    ) {
      this.tick();
    }
  }

  startTimer = () => {
    this.props.startNewTimer(this.props.user, this.props.match.params.id);
  };

  stopTimer = () => {
    this.props.stopActiveTimer(this.props.activeTimerId);
  };

  tick = () => {
    setInterval(() => this.setTimer(), 1000);
  };

  setTimer = () => {
    const formattedStart = moment(this.props.startTime);
    const formattedNow = moment(Date.now());
    const duration = moment.duration(formattedNow.diff(formattedStart));
    const timer = moment(duration._data).format('HH:mm:ss');

    this.setState({
      ...this.state,
      timer
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col>
            <h1>{this.state.name}</h1>
          </Col>
        </Row>
        <Row>
          <Col md="4" />
          <Col md="4">
            {this.props.activeTimer ? <h3>{this.state.timer}</h3> : null}
            {this.props.activeTimer ? (
              <StyledStop>
                <StopIcon onClick={this.stopTimer} />
              </StyledStop>
            ) : (
              <StyledStart>
                <PlayIcon onClick={this.startTimer} />
              </StyledStart>
            )}
          </Col>
          <Col md="4" />
        </Row>
          {this.props.hoursLogged.map((hour, i) => {
            const start = moment(hour.startTime);
            const end = moment(hour.endTime);
            const duration = moment.duration(end.diff(start));
            return (
              <Link to={`timestamp/${hour._id}`}><HourLog
                key={i}
                date={start.format('MM/DD/YYYY')}
                totalTime={moment(duration._data).format('HH:mm:ss')}
              /></Link>
            );
          })}
      </div>
    );
  }
}

const HourLog = props => {
  return (
    <Row>
      <Col xs="6">
        <h4>{props.date}</h4>
      </Col>
      <Col xs="6">
        <h4>{props.totalTime}</h4>
      </Col>
    </Row>
  );
};

const StyledStart = styled.div`
  font-size: 3em;
  color: blue;

  :hover {
    cursor: pointer;
  }
`;

const StyledStop = styled.div`
  font-size: 3em;
  color: red;
`;

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    activeTimer: state.timestampReducer.activeTimer,
    activeTimerId: state.timestampReducer.activeTimerId,
    startTime: state.timestampReducer.startTime,
    hoursLogged: state.userReducer.hoursLogged
  };
};

export default connect(mapStateToProps, { startNewTimer, stopActiveTimer })(
  VendorClientPage
);
