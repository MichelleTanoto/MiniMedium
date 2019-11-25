import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
      axios
      .get('http://localhost:3001/users/')
      .then(response => {
       console.log('Yeet users are fetched!')
       setUsers(response.data.map((data) => users.concat(data.username)));
         })
     }, [])

    const handleUserChange = (event) => {setUsername(event.target.value)}
    
    const addUser = (event) => {
        event.preventDefault();
        
        let flag = users.map((user) => {
        if(user.name === username){return 1}
      })

        if(flag){
          const ans = window.prompt(`${username} already exist. Replace old username with new one?`)
          if(ans){
            const user = users.find(user => user.name == username)
            const changedUser = {username: ans}
            // axios put
          }
        }

        else{
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