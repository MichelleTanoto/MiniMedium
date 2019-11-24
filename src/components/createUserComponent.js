import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [username, setUsername] = useState('');

    const handleUserChange = (event) => {
        console.log(event.target.value)
        setUsername(event.target.value)
      }
    
    const addUser = (event) => {
        event.preventDefault();
        
        const newUser = {
            username: username
        }
        axios
        .post('http://localhost:3001/users/add', newUser)
        .then((res) => {
           console.log(res.data);
           setUsername(username.concat(res.data));
           setUsername('');
         });
  }
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={addUser}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={username}
                onChange={handleUserChange}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }

export default CreateUser;