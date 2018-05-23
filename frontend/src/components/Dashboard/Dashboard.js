import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col } from 'reactstrap';
import { Link, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import FaCircle from 'react-icons/lib/fa/plus-circle';
import { connect } from 'react-redux';
import { getUserInfo } from '../../store/action/userActions';

// Components
import CreateClient from '../CreateClient/CreateClient';
import Settings from '../Settings/Settings';

class Dashboard extends Component {
  state = {
    user: '',
    name: '',
    email: '',
    clients: [],
    hoursLogged: [],
    invoices: []
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.getUserInfo(this.props.user);
    }
  }

  render() {
    return (
      <div>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href="/dashboard">Home</a>
          </BreadcrumbItem>
          <BreadcrumbItem active>Clients</BreadcrumbItem>
        </Breadcrumb>
        <Row>
          <Col md="2">
            <StyledMenu>
              <div>
                <Link to="/dashboard/client">Clients</Link>
              </div>
              <div>
                <Link to="/dashboard/billing">Billing</Link>
              </div>
              <div>
                <Link to="/dashboard/settings">Settings</Link>
              </div>
            </StyledMenu>
          </Col>
          <Col>
            <Switch>
              <Route path={'/dashboard/client/new'} component={CreateClient} />
              <Route path={'/dashboard/settings'} component={Settings} />
              <Route
                path={'/dashboard'}
                component={mainDash}
                clients={this.state.clients}
              />
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

const mainDash = props => {
  return (
    <div>
      <AddText>
        <div>New Client</div>
        <div>
          <Link to="/dashboard/client/new">
            <FaCircle />
          </Link>
        </div>
      </AddText>
    </div>
  );
};

const StyledMenu = styled.div`
  border: 1px black;
  border-style: inset;
  background-color: rgb(242, 242, 243);
  @media (min-width: 768px) {
    min-height: 60vh;
  }
`;

const AddText = styled.div`
  padding-top: 15vh;
  font-size: 4em;
`;

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    name: state.userReducer.name,
    email: state.userReducer.email,
    clients: state.userReducer.clients,
    hoursLogged: state.userReducer.hoursLogged,
    invoices: state.userReducer.invoices
  };
};

export default connect(mapStateToProps, { getUserInfo })(Dashboard);
