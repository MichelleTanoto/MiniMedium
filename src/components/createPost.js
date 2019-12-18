import React, {useState, useEffect} from 'react';
import axios from 'axios';
import service from '../utils/token';

const CreatePost = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [newPost, setNewPost] = useState('');
    const [category, setCategory] = useState(['Technology', 'Business', 'Engineering', 'Art']);
    const [tag, setTag] = useState(category[0]);

     useEffect(() => {
         axios
         .get('http://localhost:3001/users/')
         .then(response => {
          console.log('Yeet users are fetched!') 
          // setUsers(response.data.map((data) => users.concat(data.username))); ???
          setUsers(response.data)
          return response; // every promise chain needs to return something
            })
         .then(response =>{
           setUsername(response.data[0].username);
         })
        }, []) 

    const addPost = (event) => {
        event.preventDefault()

        const postObject = {
          username: username,
          title: title,
          content: newPost,
          category: tag,
          date: new Date().toISOString()
        }

        service.create(postObject)
        .then(res => {
          console.log("New Post successfully added!"); 
          setNewPost('');
        })
        .catch((error) => console.log("shit"))
        // axios
        // .post('http://localhost:3001/posts/add', postObject, config)
        // .then(res => {
        //   console.log("New Post successfully added!");
        // })
        // .catch((error) => console.log("shit"))
        // setNewPost('');
        // }
      }
    
    const handlePostChange = (event) => { setNewPost(event.target.value)}
    const handleUserChange = (event) => {setUsername(event.target.value)}
    const handleTagChange = (event) => {setTag(event.target.value)}
    const handleTitleChange = (event) => {setTitle(event.target.value)}

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
              key={user.id}
              value={user.username}>{user.username}
              </option>);
             }
      )}
      </select>   
            </div>
            <div> 
              <label>Title: </label>
              <input type="text"
                  value={title}
                  onChange={handleTitleChange}
                  />
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

export default { CreatePost }
