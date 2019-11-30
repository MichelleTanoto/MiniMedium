import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostsList = () => {
    const [post, setPost] = useState([]);
    const [filtered, setFiltered] = useState([]);
    
    useEffect(() => {
        axios
          .get('http://localhost:3001/posts/')
          .then(response => {
            console.log('Yeet posts are fetched!')
            setPost(response.data)
            setFiltered(response.data);
          })
      }, [])

    const searchPosts = (event) => {
        setFiltered(post);
        if(event.target.value !== ""){
          setFiltered(post.filter((post) => {
            return post.username.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
          })
        )
      }}
    
    const deletePost = (id) => {
        axios
        .delete(`http://localhost:3001/posts/${post.id}`)
        .then(res => {
          setPost(post.filter(p => p.id != id));
          console.log('Post are deleted!');
        }) 
        }

    const Post = props => (
            <tr>
              <td>{props.post.username}</td>
              <td>{props.post.content}</td>
              <td>{props.post.category}</td>
              <td>{props.post.date}</td>
              <td>
                <Link to={"/edit/"+props.post.id}>edit</Link> | <a href="#" onClick={() => {deletePost(props.post.id) }}>delete</a>
              </td>
            </tr>
          )
    const PostHandler = () => {
        return filtered.map(post => {
            return <Post post={post} key={post.id}/>;
          })   
    }
    
    return (
        <div>
          <h3>MyMedium Posts</h3>
           <div>
                  <input 
                  type="text" 
                  placeholder="Search..." onChange={searchPosts}/>
            </div>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                <th>Content</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <PostHandler />
            </tbody>
          </table>
        </div>
      ) 
}

export default PostsList;