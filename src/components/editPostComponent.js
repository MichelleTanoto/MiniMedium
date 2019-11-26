import React, {useState, useEffect} from 'react';
import axios from 'axios';

const EditPost = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [newPost, setNewPost] = useState('');
  const [tag, setTag] = useState('');
  const [category, setCategory] = useState(['Technology', 'Business', 'Engineering', 'Art'])
    
  useEffect(() => {
      axios
      .get('http://localhost:3001/users/')
      .then(response => {
       console.log('YaAAA')
       setUsers(response.data)
         })
    axios
    .get(`http://localhost:3001/users/${1}`)
    .then(response => {
      //  setUsername(response.data.username),
      //  setNewPost(response.data.content),
      //  setTag(response.data.category)
      console.log(response.data);
       });
   }, [])
  
  const handlePostChange = (event) => {
    console.log(event.target.value)
    setNewPost(event.target.value)
      }

  const handleUserChange = (event) => {
    console.log(event.target.value)
    setUsername(event.target.value)
}

  const handleTagChange = (event) => {
  console.log(event.target.value)
  setTag(event.target.value)
}
  
  const updatePost = () => {
    const postObject = {
      username: username,
      content: newPost,
      category: tag,
      date: new Date().toISOString()
    }
    axios
    .post(`http://localhost:3001/posts/update/${1}`,postObject)
    .then(res => console.log("Data updated!"));

  // window.location = '/';
  }
     
    return (
        <div>
          <h3>Create New Posts</h3>
          <form onSubmit={updatePost}>
            <div className="form-group"> 
              <label>Username: </label>
              <select ref="userInput"
                  required
                  className="form-control"
                  value={username}
                  onChange={handleUserChange}>
                  {
                    users.map(function(user) {
                      return <option 
                        key={user.id}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Content: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={newPost}
                  onChange={handlePostChange}
                  />
            </div>
            <div className="form-group">
            <label>Category: </label>
              <select ref="userInput"
                  required
                  className="form-control"
                  value={tag}
                  onChange={handleTagChange}>
                  {
                    category.map(function(tag) {
                      return <option 
                        key={tag}
                        value={tag}>{tag}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group">
              <input type="submit" value="Edit Post" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
}
export default EditPost;