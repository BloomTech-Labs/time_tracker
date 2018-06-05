import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col
} from 'reactstrap';
import moment from 'moment';
import styled from 'styled-components';

class Invoice extends Component {
  componentDidMount() {
    console.log(this.props.invoices);
  }
  render() {
    return (
      <Row>
        {this.props.invoices.map(invoice => {
          return (
            <Col key={invoice._id}>
              <Card style={{ marginBottom: 5 }}>
                {/* remove .pdf and replace with .jpg */}
                <StyledImage
                  top
                  src={invoice.url.replace(/\b(.pdf)\b/g, '.jpg')}
                  alt="invoice image"
                />
                <CardBody>
                  <CardTitle>{invoice.clientNum.name}</CardTitle>
                  <CardSubtitle>
                    {moment(invoice.dateCreated).format('MM/DD/YYYY')}
                  </CardSubtitle>
                  <CardSubtitle>Total: {invoice.total}</CardSubtitle>
                  <Button href={invoice.url} target="_blank">
                    Open Invoice
                  </Button>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    );
  }
}

const StyledImage = styled(CardImg)`
  max-width: 15vw;
  margin: auto;
`;

const mapStateToProps = state => {
  return {
    invoices: state.userReducer.invoices
  };
};

export default connect(mapStateToProps, null)(Invoice);
