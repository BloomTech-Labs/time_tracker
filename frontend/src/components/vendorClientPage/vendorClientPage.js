import React, { Component } from 'react';
import TopBar from '../TopBar/TopBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Col, Row } from 'reactstrap';
import axios from 'axios';

const backend = process.env.BASE_URL || 'http://localhost:5000';

class VendorClientPage extends Component {
	state = {
		name: '',
		hoursLogged: [],
		invoices: []
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		axios.get(`${backend}/vendor/client/${id}`)
			.then(({ data }) => {
				this.setState({
					name: data.name,
					hoursLogged: data.hoursLogged,
					invoices: data.invoices
				})
			})
			.catch((err) => {
				console.log(err);
			});
	}

	render() {
		return (
			<div>
				<Row>
					<Col><h1>{this.state.name}</h1></Col>
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
	connect(mapStateToProps, null)(VendorClientPage)
);
