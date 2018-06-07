import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../../store/action/userActions';
import { withRouter } from 'react-router-dom';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    if (this.props.loggedIn) {
      return (
        <div>
          <StyledNavbar dark expand="md">
            <NavbarBrand tag={Link} to="/dashboard/clients">
              time tracker
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            {/* 
            <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
              <StyledToggle caret>clients</StyledToggle>
              <StyledDropdownMenu>
                {this.props.clients.map(client => {
                  return <DropdownItem>{client.name}</DropdownItem>;
                })}
              </StyledDropdownMenu>
            </Dropdown> */}

            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/dashboard/clients">
                    clients
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/dashboard/clients/invoices">
                    invoices
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/dashboard/billing">
                    billing
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/aboutus">
                    about us
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    onClick={() => this.props.logOut(this.props.history)}
                  >
                    log out
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </StyledNavbar>
        </div>
      );
    }
    return (
      <div>
        <StyledNavbar dark expand="md">
          <NavbarBrand href="/">Time Tracker</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/aboutus">
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#">Pricing</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/login">
                  SignUp/Login
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </StyledNavbar>
      </div>
    );
  }
}

const StyledNavbar = styled(Navbar)`
  background: #e3170a;
  background-color: #e3170a;
  border-color: transparent;
  font-family: 'Roboto Mono';
`;

const StyledToggle = styled(DropdownToggle)`
  background-color: transparent;
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  -webkit-transition: none;
  transition: none;
  display: none;
`;

const mapStateToProps = state => {
  return {
    loggedIn: state.userReducer.loggedIn,
    clients: state.userReducer.clients
  };
};

export default withRouter(connect(mapStateToProps, { logOut })(TopBar));
