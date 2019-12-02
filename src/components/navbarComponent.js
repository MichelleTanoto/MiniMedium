import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { MDBIcon } from "mdbreact";

// untitled = about
// search = search
const Navigationbar = () => {
    return (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
  <Navbar.Brand href="/">Untitled</Navbar.Brand> 
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto"></Nav>
    <Nav>
    <Nav.Link href="/search"><MDBIcon icon="search"/></Nav.Link>
      <Nav.Link href="/notification">Notification</Nav.Link>
    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/create">New story</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>
      // <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      //   <Link to="/" className="navbar-brand">Untitled</Link>
      //   <div className="collpase navbar-collapse">
      //   <ul className="navbar-nav mr-auto">
      //   <li className="navbar-item">
      //     <Link to="/" className="nav-link">Untitled Posts</Link>
      //     </li>
      //     <li className="navbar-item">
      //     <Link to="/create" className="nav-link">Create Posts</Link>
      //     </li>
      //   </ul>
      //   </div>
      // </nav>
    );
  }

export default Navigationbar;