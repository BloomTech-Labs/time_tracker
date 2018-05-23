import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Col, Row } from 'reactstrap';


class VendorClientPage extends Component {

	render() {
		return (
			<div>
				{console.log('this.props', this.props)}
				<Row>
					<Col><h1>Client Name</h1></Col>
				</Row>
				<Row>
					<Col xs="6"><h4>05/23/18</h4></Col>
					<Col xs="6"><h4>8 hrs</h4></Col>
				</Row>
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
	connect(mapStateToProps)(VendorClientPage)
);
