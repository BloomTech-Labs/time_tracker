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
import ClientList from '../ClientList/ClientList';
import VendorClientPage from '../VendorClientPage/VendorClientPage';
import TimestampDetail from '../TimestampDetail/TimestampDetail';
import Invoice from '../Invoice/Invoice';
import NewInvoice from '../NewInvoice/NewInvoice';

class Dashboard extends Component {
  state = {
    user: '',
    name: '',
    email: '',
    clients: [],
    hoursLogged: [],
    invoices: [],
    userType: ''
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.getUserInfo(this.props.user, this.props.userType);
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
                <Link to="/dashboard/clients">Clients</Link>
              </div>
              <div>
                <Link to="/dashboard/billing">Billing</Link>
              </div>
              <div>
                <Link to="/dashboard/setting">Settings</Link>
              </div>
              <div>
                <Link to="/dashboard/clients/invoices/new">new invoice</Link>
              </div>
              <div>
                <Link to="/dashboard/clients/invoices">Invoices</Link>
              </div>
            </StyledMenu>
          </Col>
          <Col>
            <Switch>
              <Route
                path={'/dashboard/clients/invoices/new'}
                component={NewInvoice}
              />
              <Route path={'/dashboard/clients/invoices'} component={Invoice} />
              <Route
                path={'/dashboard/clients/timestamp/:id'}
                component={TimestampDetail}
              />
              <Route path={'/dashboard/clients/new'} component={CreateClient} />
              <Route
                path={'/dashboard/clients/:id'}
                component={VendorClientPage}
              />
              <Route path={'/dashboard/clients'} component={ClientList} />
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
          <Link to="/dashboard/clients/new">
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
    invoices: state.userReducer.invoices,
    userType: state.userReducer.userType
  };
};

export default connect(mapStateToProps, { getUserInfo })(Dashboard);
