import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap'

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

    //         const user = users.find(user => user.username == username)
    //         const changedUser = {username: ans}
    //         axios
    //         .put(`http://localhost:3001/users/update/${user.id}`,changedUser)
    //         .then(response => {
    //           setUsers(users.map(u => user.id !== u.id ? u : response.data))
    //           console.log("Users are changed!")
    //         })
    //         .catch(error => console.log("ah shit here we go again"))   
    //       }
    //     }

    return (
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
    //   <div>
    //     <h3>Create New User</h3>
    //     <form onSubmit={addUser}>
    //       <div className="form-group"> 
    //         <label>Username: </label>
    //         <input  type="text"
    //             required
    //             className="form-control"
    //             value={username}
    //             onChange={handleUserChange}
    //             />
    //       </div>
    //       <div className="form-group">
    //         <input type="submit" value="Create User" className="btn btn-primary" />
    //       </div>
    //     </form>
    //   </div>
    )
  }

export default Register;