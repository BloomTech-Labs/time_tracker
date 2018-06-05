import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import fileDownload from 'js-file-download';
import moment from 'moment';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { getUserInfo } from '../../store/action/userActions';

const backend =
  process.env.NODE_ENV === 'production'
    ? `https://ls-time-tracker.herokuapp.com`
    : `http://localhost:5000`;

class NewInvoice extends Component {
  state = {
    timestamp: [],
    totalHours: 0,
    rate: 0,
    name: '',
    total: 0,
    loadingModal: false
  };

  componentDidMount() {
    if (this.props.timestamps.length > 0) {
      let totHours = this.props.timestamps.reduce((acc, timestamp) => {
        return acc + Number(timestamp.duration.split(':')[0]);
      }, 0);
      let totalMinutes = this.props.timestamps.reduce((acc, timestamp) => {
        return acc + Number(timestamp.duration.split(':')[1]);
      }, 0);
      if (totalMinutes >= 60) {
        totHours += parseInt(totalMinutes / 60, 10);
        totalMinutes -= parseInt(totalMinutes / 60, 10) * 60;
      }
      this.setState({
        ...this.state,
        totalHours: totHours,
        totalMinutes
      });
    } else {
      return;
    }
  }

  setRate = ({ target }) => {
    this.setState({
      rate: target.value,
      total:
        target.value *
        (Number(this.state.totalHours) + Number(this.state.totalMinutes / 60))
    });
  };

  generatePDF = () => {
    this.setState({
      ...this.state,
      loadingModal: true
    });
    axios
      .post(
        `${backend}/invoice/new`,
        {
          timestamps: this.props.timestamps,
          hourlyRate: this.state.rate,
          name: this.props.name,
          total: this.state.total
        },
        {
          headers: {
            token: window.localStorage.getItem('Authorization'),
            userType: window.localStorage.getItem('UserType')
          }
        }
      )
      .then(({ data }) => {
        this.props.getUserInfo(this.props.user, this.props.userType);
        setTimeout(() => this.setState({ loadingModal: false }), 1500);
      })
      .catch(err => {
        console.log(err);
      });
  };

  toggleSuccess = () => {
    this.setState({
      loadingModal: !this.state.loadingModal
    });
  };

  render() {
    if (!this.props.paid) {
      this.props.history.push('/dashboard/billing');
    }
    return (
      <div>
        {this.props.timestamps ? (
          this.props.timestamps.map(timestamp => {
            return (
              <Row key={timestamp._id}>
                <Col md="6">
                  {moment(timestamp.startTime).format('MM/DD/YYYY')}
                </Col>
                <Col md="6">{timestamp.duration}</Col>
              </Row>
            );
          })
        ) : (
          <div>Add timestamps to invoice</div>
        )}
        <h3>
          Total time: {this.state.totalHours} :{' '}
          {this.state.totalMinutes || '00'}
        </h3>
        <div>Hourly rate</div>
        <input type="number" onChange={this.setRate} value={this.state.rate} />
        <div>
          <h4>total: {this.state.total}</h4>
        </div>
        <button onClick={this.generatePDF}>Click</button>
        <Modal
          isOpen={this.state.loadingModal}
          toggle={this.toggleSuccess}
          onClosed={() =>
            this.props.history.push('/dashboard/clients/invoices')
          }
        >
          <ModalHeader toggle={this.toggleSuccess}>Changes Saved</ModalHeader>
          <ModalBody>Changed Successfully</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleSuccess}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    timestamps: state.invoiceReducer.timestamps,
    name: state.userReducer.name,
    paid: state.userReducer.user,
    user: state.userReducer.user,
    userType: state.userReducer.userType
  };
};

export default withRouter(
  connect(mapStateToProps, { getUserInfo })(NewInvoice)
);
