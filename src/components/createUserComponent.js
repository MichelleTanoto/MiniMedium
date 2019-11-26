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
       setUsers(response.data)
      //  setUsers(response.data.map((data) => users.concat(data)));
         })
     }, [])

    const handleUserChange = (event) => {setUsername(event.target.value)}
    
    const addUser = (event) => {
        event.preventDefault();
    
    let flag = false;
    users.map((user) => {
         console.log(user.username + "####" + username);
         if(user.username == username){flag=true}
      })

        if(flag){
          const ans = window.prompt(`${username} already exist. Replace old username with new one?`)
          if(ans){
            const user = users.find(user => user.username == username)
            const changedUser = {username: ans}
            axios
            .put(`http://localhost:3001/users/update/${user.id}`,changedUser)
            .then(response => {
              setUsers(users.map(u => user.id !== u.id ? u : response.data))
              console.log("Users are changed!")
            })
            .catch(error => console.log("ah shit here we go again")) 
          }
        }

        else{
        const newUser = {
            username: username
        }
        axios
        .post('http://localhost:3001/users/add', newUser)
        .then((res) => {
           console.log('Users are created!');
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