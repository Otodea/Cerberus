import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import './Navbar.css';

import LoginModal from './login-modal/LoginModal';
import SignupModal from './signup-modal/SignupModal';

class NavbarComponent extends Component {

  constructor() {
    super();
    this.state = {
      isLogged: localStorage.getItem('isLogged'),
      loggedUser: localStorage.getItem('loggedUser')
    };

    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.setItem('isLogged', 'false');
    localStorage.setItem('loggedUser', '');
    localStorage.setItem('serialid', '');
    window.location.href = '/';
  }

  render () {
    if (this.state.isLogged === 'true') {
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Cerberus</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem href="/surveillance">
                Surveillance
              </NavItem>
              <NavDropdown title="About" id="basic-nav-dropdown">
                <MenuItem href="/about-cerberus">Cerberus</MenuItem>
                <MenuItem href="/team">The Team</MenuItem>
              </NavDropdown>
              <NavItem href="/contact">
                Contact Us
              </NavItem>
              <NavDropdown title={this.state.loggedUser} id="basic-nav-dropdown">
                <MenuItem href="/profile">Profile</MenuItem>
                <MenuItem onClick={this.logout}>Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Cerberus</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavDropdown title="About" id="basic-nav-dropdown">
                <MenuItem href="/about-cerberus">Cerberus</MenuItem>
                <MenuItem href="/team">The Team</MenuItem>
              </NavDropdown>
              <NavItem href="/contact">
                Contact Us
              </NavItem>
              <NavItem>
                <LoginModal />
              </NavItem>
              <NavItem>
                <SignupModal />
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }

  }
}

export default NavbarComponent;
