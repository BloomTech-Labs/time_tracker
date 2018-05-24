import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';
import PlayIcon from 'react-icons/lib/fa/play';
import StopIcon from 'react-icons/lib/fa/stop';
import styled from 'styled-components';
import moment from 'moment';
import {
  startNewTimer,
  stopActiveTimer
} from '../../store/action/timestampActions';

const backend = process.env.BASE_URL || 'http://localhost:5000';

class VendorClientPage extends Component {
  state = {
    name: '',
    user: '',
    activeTStamp: '',
    hoursLogged: [],
    invoices: [],
    activeTimer: false,
    timer: ''
  };

  componentDidMount() {
    this.getClient();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.activeTimer !== prevProps.activeTimer &&
      this.props.activeTimer
    ) {
    }
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

  startTimer = () => {
    this.props.startNewTimer(this.props.user, this.props.match.params.id);
    this.setTimer();
  };

  stopTimer = () => {
    this.props.stopActiveTimer();
  };

  setTimer = () => {
    const formattedStart = moment(this.props.startTime);
    const formattedNow = moment(Date.now());
    const duration = moment.duration(formattedNow.diff(formattedStart));
    const hours =
      duration.get('hours').toString().length < 2
        ? '0' + duration.get('hours').toString()
        : duration.get('hours').toString();
    const minutes =
      duration.get('minutes').toString().length < 2
        ? '0' + duration.get('minutes').toString()
        : duration.get('minutes').toString();
    const seconds =
      duration.get('seconds').toString().length < 2
        ? '0' + duration.get('seconds').toString()
        : duration.get('seconds').toString();
    const timer = `${hours}:${minutes}:${seconds}`;

    this.setState({
      ...this.state,
      timer
    });
    console.log(this.state.timer);
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
            {this.state.activeTimer ? <h3>1:23</h3> : null}
            {this.state.activeTimer ? (
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
        <Row>
          <Col xs="6">
            <h4>05/23/18</h4>
          </Col>
          <Col xs="6">
            <h4>8 hrs</h4>
          </Col>
        </Row>
      </div>
    );
  }
}

const StyledStart = styled.div`
  font-size: 3em;
  color: green;

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
    startTime: state.timestampReducer.startTime
  };
};

export default connect(mapStateToProps, { startNewTimer, stopActiveTimer })(
  VendorClientPage
);
