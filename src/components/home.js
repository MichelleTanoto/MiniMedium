import React, {useEffect, useState} from 'react';
import Navigationbar from "./navbar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import service from '../utils/token';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user.token);
      service.setToken(user.token);
    }
  }, [])

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
  <Nav.Item>
    <Nav.Link eventKey="link-4"    
    style={{color: 'grey', textDecoration: 'none'}}>
   Culture
    </Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-4"    
    style={{color: 'grey', textDecoration: 'none'}}>
    Nature</Nav.Link>
  </Nav.Item>
  <Nav.Item>
    <Nav.Link eventKey="link-4"    
    style={{color: 'grey', textDecoration: 'none'}}>
    Science</Nav.Link>
  </Nav.Item>
      </Nav>
    </Container>
  </div>
    )
}

export default Home;