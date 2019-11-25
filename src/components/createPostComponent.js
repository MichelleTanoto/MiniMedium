import React, {useState, useEffect} from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [newPost, setNewPost] = useState('');
    const [category, setCategory] = useState(['Technology', 'Business', 'Engineering', 'Art']);
    const [tag, setTag] = useState(category[0]);

     useEffect(() => {
         axios
         .get('http://localhost:3001/users/')
         .then(response => {
          console.log('Yeet users are fetched!')
          setUsers(response.data.map((data) => users.concat(data.username)));
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
        .catch((error) => console.log("shit"))
        setNewPost('');
        }
    
    const handlePostChange = (event) => { setNewPost(event.target.value)}
    const handleUserChange = (event) => {setUsername(event.target.value)}
    const handleTagChange = (event) => {setTag(event.target.value)}

    return (
        <div>
          <h3>Create New Posts</h3>
          <form onSubmit={addPost}>
            <div> 
              <label>Username: </label>
              <select 
             value={username}
             onChange={handleUserChange}> 
             {users.map((user) => {
                return(
              <option 
              key={user}
              value={user}>{user}
              </option>);
             }
      )}
      </select>   
            </div>
            <div> 
              <label>Content: </label>
              <input type="text"
                  value={newPost}
                  onChange={handlePostChange}
                  />
            </div>
            <div>
            <label>Category: </label>
              <select
                  value={tag}
                  onChange={handleTagChange}>
                  {
                    category.map((tag) => {
                      return( <option 
                        key={tag}
                        value={tag}>{tag}
                      </option> );
                    })
                  }
              </select>
            </div>
            <div>
              <input type="submit" value="Create Post"/>
            </div>
          </form>
        </div>
        )
}

export default CreatePost;