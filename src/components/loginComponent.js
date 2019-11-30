import React, {useState, useEffect} from 'react';
import axios from 'axios';

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
           if(u.username === username){console.log('username already exist.')}
   })
  }

    return (
        <form onSubmit={matchLogin}>
        <label>Username</label><br></br>
        <input
          name="username"
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={handleUsernameChange}
        /><br></br>
        <label>Password</label><br></br>
        <input
          name="password"
          type="text"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
        /><br></br>
        <input type="submit" value="Login"/>
      </form>
    );
  }

export default Login;