import React from 'react';
import Navigationbar from "./navbar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

const Home = () => {
    return(
    <div>
        <Navigationbar />
    <Container>
      <br />
      <Nav activeKey="/posts/home" variant="dark">
  <Nav.Item>
    <Nav.Link href="/posts/home" 
    style={{color: 'grey', textDecoration: 'none'}}>
    Home</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-1"
       style={{color: 'grey', textDecoration: 'none'}}>
    Art</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-2"
    style={{color: 'grey', textDecoration: 'none'}}>
    Technology</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-3"    
    style={{color: 'grey', textDecoration: 'none'}}>
      Health</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-4"    
    style={{color: 'grey', textDecoration: 'none'}}>
    Business</Nav.Link>
  </Nav.Item>
      </Nav>
    </Container>
  </div>
    )
}

export default Home;