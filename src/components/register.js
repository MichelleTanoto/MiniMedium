import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

const Register = () => {
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

    const handleUsernameChange = (event) => {setUsername(event.target.value)}
    const handlePasswordChange = (event) => {setPassword(event.target.value)}
    
    const addUser = (event) => {
        event.preventDefault();
        let exist= false;
        users.map((user) => {
            if(user.username == username){console.log('Username already exist, choose another one.'); exist=true; }
        })

        if(!exist){
            const newUser = {username: username, password: password}
            axios
                .post('http://localhost:3001/users/add', newUser)
                .then((res) => {
                   console.log('Users are created!');
                   setUsername('');
                   setPassword('');
                 });
                }
                exist=false;
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

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Container>
    )
  }

export default Register;