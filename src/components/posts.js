import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
    const user = window.localStorage.getItem('loggedInUser')
    const parsedUser = JSON.parse(user)
    console.log(parsedUser.id);

    axios
    .get(`http://localhost:3001/users/${parsedUser.id}/posts`)
    .then(response => {
      console.log('Yeet posts are fetched!')
      setPosts(response.data)
    })
  }, [])
    
    const handleClick = (props) =>
    {
       setLikes(likes + 1);

      const postObject = {
        title: props.title,
        content: props.content,
        category: props.category,
        date: new Date().toISOString(),
        likes: props.likes + likes
      }

      axios
      .put(`http://localhost:3001/posts/update/${props.id}`, postObject)
      .then(response => response.data)
       setLikes(0);
    }
           
    const deletePost = (id) => {
      axios
      .delete(`http://localhost:3001/posts/${id}`)
      .then(res => {
        setPosts(posts.filter(p => p.id !== id));
        console.log('Post are deleted!');
      })
      }

    const Post = (props) => {
      return(
        <Container>
        <div>
          <Link to="/category">{props.post.category}</Link> 
          <p> {props.post.date}</p>
          <h3> {props.post.title}</h3>
          <p> {props.post.content}</p>
          <Link to={"/edit/"+props.post.id}>edit</Link> | <a href="#" onClick={() => {deletePost(props.post.id) }}>delete</a> <br />
          <button onClick= {() => {handleClick(props.post)}}>{props.post.likes}</button>
          <hr />
          <br />
        </div>
        </Container>
      )
    }

    const postHandler = () => {
      return posts.map(post => {
          return <Post post={post} key={post.id}/>;
        })   
  }

    return(
        <div>
            <h2> Your Stories </h2>
           {postHandler()}
        </div>
    )
}

export default Posts;