import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import axios from 'axios';
import PlayIcon from 'react-icons/lib/fa/play';
import StopIcon from 'react-icons/lib/fa/stop';
import styled from 'styled-components';
import moment from 'moment';
import {
  startNewTimer,
  stopActiveTimer
} from '../../store/action/timestampActions';

import TimestampList from '../TimestampList/TimestampList';

const backend =
  process.env.NODE_ENV === 'production'
    ? `https://ls-time-tracker.herokuapp.com`
    : `http://localhost:5000`;

class VendorClientPage extends Component {
  state = {
    name: '',
    user: '',
    hoursLogged: [],
    invoices: [],
    activeTimer: false,
    activeTimerId: '',
    timer: '',
    userType: ''
  };

  componentDidMount() {
    this.getClient();
  }

  getClient = () => {
    const id = this.props.match.params.id;
    if (this.props.userType === 'client') {
      axios
        .get(`${backend}/client/ts/${this.props.user}/vendor/${id}`)
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
    } else {
      axios
        .get(`${backend}/vendor/ts/${this.props.user}/client/${id}`)
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
    }
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
        {this.state.hoursLogged.map((hour, i) => {
          return <TimestampList key={hour._id} hour={hour} />;
        })}
      </div>
    );
  }
}

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
    hoursLogged: state.userReducer.hoursLogged,
    userType: state.userReducer.userType
  };
};

export default connect(mapStateToProps, {
  startNewTimer,
  stopActiveTimer
})(VendorClientPage);
