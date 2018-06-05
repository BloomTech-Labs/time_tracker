import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { paymentSuccess } from '../../store/action/userActions';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const backend =
  process.env.NODE_ENV === 'production'
    ? `https://ls-time-tracker.herokuapp.com`
    : `http://localhost:5000`;

class Subscription extends Component {
  state = {
    successModal: false
  };

  onToken = token => {
    axios
      .post(
        `${backend}/vendor/checkout`,
        {
          token: token.id,
          amount: 500,
          vendorId: this.props.user
        },
        {
          headers: {
            token: window.localStorage.getItem('Authorization'),
            userType: window.localStorage.getItem('UserType')
          }
        }
      )
      .then(({ data }) => {
        this.props.paymentSuccess();
        this.setState({ successModal: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  toggleSuccess = () => {
    this.setState({
      ...this.state,
      successModal: !this.state.successModal
    });
  };

  render() {
    return (
      <div>
        Subscription component
        <div>
          <h3>pay monthly for only $5/month</h3>
          <button>submit</button>
        </div>
        <div>
          <h3>Pay for the year and save.</h3>
          <button>submit</button>
        </div>
        <StripeCheckout
          stripeKey="pk_test_aJJUpO0Rhq6Y6bGqF88tjdMt"
          token={this.onToken}
        />
        <Modal
          isOpen={this.state.successModal}
          toggle={this.toggleSuccess}
          onClosed={() => this.props.history.push('/dashboard/clients')}
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
    user: state.userReducer.user
  };
};

export default withRouter(
  connect(mapStateToProps, { paymentSuccess })(Subscription)
);
