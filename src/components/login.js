import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Register from "./register";
import Container from 'react-bootstrap/Container';

const Login = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [users, setUsers] = useState([]);

   useEffect(() => {
    axios
    .get('http://localhost:3001/users/')
    .then(response => {
     console.log('Yeet users are fetched!')
     setUsers(response.data)
    //  setUsers(response.data.map((data) => users.concat(data)));
       })
   }, [])

   const handleUsernameChange = (event) => {
       event.preventDefault();
       setUsername(event.target.value);
   }

   const handlePasswordChange = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
   }

   const matchLogin = (event) => {
     event.preventDefault();
     users.map(u => {
           if(u.username == username){
             if(u.password == password){
               console.log('Successful Login!');
               return true;
              }
             else{
               console.log('Password does not match!')
               return false;
              }
            }
   }
   )
   console.log('Please register first.')
   return false;
  }
   
  return(
    <Container>
      <br />
  <Form onSubmit={matchLogin}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control 
    required
    type="username" 
    placeholder="Enter Username" 
    value={username}
    onChange={handleUsernameChange} />
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
    onChange={handlePasswordChange}  />
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
</Container>
  )
}
  //   return (
  //       <form onSubmit={matchLogin}>
  //       <label>Username</label><br></br>
  //       <input
  //         name="username"
  //         type="text"
  //         placeholder="Enter your Username"
  //         value={username}
  //         onChange={handleUsernameChange}
  //       /><br></br>
  //       <label>Password</label><br></br>
  //       <input
  //         name="password"
  //         type="text"
  //         placeholder="Enter your password"
  //         value={password}
  //         onChange={handlePasswordChange}
  //       /><br></br>
  //       <input type="submit" value="Login"/>
  //     </form>
  //   );
  // }

export default Login;