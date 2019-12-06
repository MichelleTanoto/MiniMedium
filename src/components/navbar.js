import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

// untitled = about
// search = search
const Navigationbar = () => {
    return (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Navbar.Brand href="/about">Untitled</Navbar.Brand> 
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto"></Nav>
    <Nav>
    <Nav.Link href="/search">Search</Nav.Link>
      <Nav.Link>Notification</Nav.Link>
    <NavDropdown title="Profile" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/create">New story</NavDropdown.Item>
        <NavDropdown.Item href="/posts">Stories</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.3">Profile</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">Settings</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.4">Sign out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    );
  }

export default Navigationbar;