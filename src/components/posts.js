import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [likes, setLikes] = useState(0);

    useEffect(() => {
    axios
    .get('http://localhost:3001/posts/')
    .then(response => {
      console.log('Yeet posts are fetched!')
      setPosts(response.data)
    })
  }, [])
    
    const addLikes = (props) =>
    {
      let like;
      setLikes(like++);

      const postObject = {
        username: props.username,
        title: props.title,
        content: props.post,
        category: props.category,
        date: new Date().toISOString(),
        likes: props.likes
      }

      axios
      .put(`http://localhost:3001/posts/update/${props.id}`, postObject)
      .then(response => response.data)
    }

    const Post = (props) => {
      return(
        <Container>
        <div>
          <p><Link to={`/profile/${props.post.id}`}>{props.post.username}</Link> in <Link to="/category">{props.post.category}</Link> </p>
          <p> {props.post.date}</p>
          <h3> {props.post.title}</h3>
          <p> {props.post.content}</p>
          <button onClick= {addLikes(props.post)}>Like</button>
          <p> {likes}</p>
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