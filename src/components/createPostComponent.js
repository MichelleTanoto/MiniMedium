import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [newPost, setNewPost] = useState('');
    const [tag, setTag] = useState('');
    const [category, setCategory] = useState(['Technology', 'Business', 'Engineering', 'Art'])
    
     useEffect(() => {
         axios
         .get('http://localhost:3001/users/')
         .then(response => {
          console.log('promise fulfilled')
          setUsers(response.data)
            })
        }, [])

    const addPost = (event) => {
        event.preventDefault()
        const postObject = {
          username: username,
          content: newPost,
          category: tag,
          date: new Date().toISOString()
        }
        axios
        .post('http://localhost:3001/posts/add', postObject)
        .then(res => {
          res.json("New Post successfully added!");
        })
        setNewPost('');
        }
    
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
        

    return (
        <div>
          <h3>Create New Posts</h3>
          <form onSubmit={addPost}>
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
                        key={user}
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
              <input type="submit" value="Create Post" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
}

export default CreatePost;