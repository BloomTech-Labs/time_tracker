import React, { Component } from 'react';

class Subscription extends Component {
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
        <form action="your-server-side-code" method="POST">
          <script
            src="https://checkout.stripe.com/checkout.js"
            className="stripe-button"
            data-key="pk_test_aJJUpO0Rhq6Y6bGqF88tjdMt"
            data-amount="999"
            data-name="Demo Site"
            data-description="Example charge"
            data-image="https://stripe.com/img/documentation/checkout/marketplace.png"
            data-locale="auto"
          />
        </form>
      </div>
    );
  }
}

export default Subscription;
