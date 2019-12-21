import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Error from "./error";
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [valid, setValid] = useState(false);

    useEffect(() => {
      axios
      .get('http://localhost:3001/users/')
      .then(response => {
       console.log('Yeet users are fetched!')
       setUsers(response.data)
      //  setUsers(response.data.map((data) => users.concat(data)));
         })
     }, [])

    const handleUsernameChange = async (event) => {
      await setUsername(event.target.value)
      validateField('username');
    }
      
    const handlePasswordChange = (event) => {
      setPassword(event.target.value); 
      validateField('password');}
    
    const validateField = (fieldName) => {
      switch(fieldName){
        case 'username':
           for(let i=0; i < users.length; i++)
           {
             if(users[i].username === username){console.log(error); setError("Username already exist.")}
           }
          break;
        
       case 'password':
          if(password.length < 6) {setError("password must be more than 6 characters.");}
         break;

       default:
        break;
       }
       validateForm();
    }

    const validateForm = () => {
      if(error === null){setValid(true);}
    }
  
    const addUser = (event) => {
        event.preventDefault();
            const newUser = {username: username, password: password}
            axios
                .post('http://localhost:3001/users/add', newUser)
                .then((res) => {
                   console.log('Users are created!');
                   setUsername('');
                   setPassword('');
                 });
         }
    
    return (
      <Container>
      <br />
  <Form onSubmit={addUser}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Username</Form.Label>
    <Form.Control 
    required
    type="username" 
    placeholder="Enter Username" 
    value={username}
    onChange={handleUsernameChange} />
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
  <Button variant="primary" type="submit" disabled={!valid}>
    Submit
  </Button>
</Form>
<Error messsage={error} />
</Container>
    )
    }

export default Register;