import React, { Component } from 'react';
import { addToInvoice } from '../../store/action/invoiceActions';
import { Col, Row, Collapse, Card, CardBody, Button, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

class TimestampList extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  addToInvoice = () => {
    this.props.addToInvoice(this.props.hour);
    console.log(moment(this.props.hour.startTime).format('MM/DD/YYYY'));
    console.log(this.props.hour.duration);
  };

  render() {
    return (
      <div>
        <div onClick={this.toggle}>{this.props.hour.duration}</div>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              {this.props.comments ? (
                <p>{this.props.hour.comments}</p>
              ) : (
                <p>No comments to show</p>
              )}
              <Row>
                <Col>
                  <p>add to invoice</p>
                </Col>
                <Col>
                  <Input type="checkbox" onChange={this.addToInvoice} />
                </Col>
              </Row>
              <div>
                <Link to={`timestamp/${this.props.hour._id}`}>
                  <Button>...</Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default connect(null, { addToInvoice })(TimestampList);
