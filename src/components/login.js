import React, {useState} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Error from "./error";
import Container from 'react-bootstrap/Container';


const Login = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [user, setUser] = useState(null);
   const [error, setError] = useState(null);

   let token = null;

   const setToken = newToken => {
     token = `bearer ${newToken}`;
   }

   const handleLogin = async (event) => {
     event.preventDefault();
    
     try {
       const config = {
         headers: { Authorization : token },
       }

       const user = await 
       axios
       .post('http://localhost:3001/login/', {"username" : username, "password" : password}, config)
       .then(response => response.data)

       window.localStorage.setItem('loggedInUser', JSON.stringify(user)
       )
       
       setToken(user.token)
       setUser(user);
       setUsername('');
       setPassword('');

       window.location = "/home";
     } catch(exception){
       setError('Wrong credentials')
       setTimeout(() => {
         setError(null);
       },5000)
     }
   }
   
  return(
    <Container>
      <br />
  <Form onSubmit={handleLogin}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control 
    required
    type="username" 
    placeholder="Enter Username" 
    value={username}
    onChange={({ target }) => setUsername(target.value)} />
    <Form.Text className="text-muted">
      Please register first if you have not.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control 
    required 
    placeholder="Password"
    value={password}
    onChange={({ target }) => setPassword(target.value)}  />
  </Form.Group>
  <Form.Group>
    <Form.Check 
    required
    label="Agree to terms and conditions" 
    />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
<Error message={error} />
</Container>
  )
}

export default Login;