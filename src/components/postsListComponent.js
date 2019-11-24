import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PostsList = () => {
    const [post, setPost] = useState([]);
    const [filtered, setFiltered] = useState(post);
    
    useEffect(() => {
        axios
          .get('http://localhost:3001/posts')
          .then(response => {
            console.log('Yeet')
            setPost(response.data)
          })
      }, [])

    const searchPosts = (event) => {
        if(event.target.value !== ""){
          setFiltered(filtered.filter((post) => {
            post.toLowerCase().includes(event.target.value.toLowerCase());
          })
          )}
      }
    
    const deletePost = (id) => {  // has error
        let afterDeletion = post;
        afterDeletion.some((el,i) => {
          if(el === id){
            afterDeletion.splice(i,1);
            return true;
          }
        })
        setPost(afterDeletion);

        axios
        .delete(`http://localhost:3001/posts/${id}`)
        .then(res => {
          console.log(res);
        }) 
        }

    const Post = props => (
            <tr>
              <td>{props.post.username}</td>
              <td>{props.post.content}</td>
              <td>{props.post.category}</td>
              <td>{props.post.date.substring(0,10)}</td>
              <td>
                <Link to={"/edit/"+props.post.id}>edit</Link> | <a href="#" onClick={() => {deletePost(props.post.id) }}>delete</a>
              </td>
            </tr>
          )
    const postHandler = () => {
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
              {postHandler() }
            </tbody>
          </table>
        </div>
      ) 
}

export default PostsList;