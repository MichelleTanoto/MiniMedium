import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [usernameValid, setUsernameValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
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

    const handleUsernameChange = (event) => {
      setUsername(event.target.value)
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
             if(users[i].username == username){setUsernameValid(false);}
           }
          break;
        
       case 'password':
          if(password.length < 6) {setPasswordValid(false);}
          else{setPasswordValid(true);}
         break;

       default:
        break;
       }

       validateForm();
    }

    const validateForm = () => {
      setValid(usernameValid && passwordValid)
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

    const UsernameConfirmation = () =>
    {
      if(!usernameValid){
        return(
          <div>
            <Alert variant='danger'>Sorry! username is already taken! please proceed to <Link to="/login">login</Link> if you already make an account with us.</Alert>
          </div>
        )
      }
      return '';
    }

    const PasswordConfirmation = () => 
    {
      if(!passwordValid){
      return(
        <div>
          <Alert variant='danger'>Password need to be more than 6 characters!</Alert>
        </div>
      )
      }
      return '';
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
  < UsernameConfirmation />
  < PasswordConfirmation />
  <Button variant="primary" type="submit" disabled={!valid}>
    Submit
  </Button>
</Form>
</Container>
    )
    }

export default Register;