import React, { Component } from 'react';
import { connect } from 'react-redux';

class Invoice extends Component {
  componentDidMount() {
    console.log(this.props.invoices);
  }
  render() {
    return (
      <div>
        <h1>invoice component</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    invoices: state.userReducer.invoices
  };
};

export default connect(mapStateToProps, null)(Invoice);
