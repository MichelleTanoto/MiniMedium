import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, FormControl, Button} from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container';
import Navigationbar from "./navbar";

const SearchPosts = () => {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [filteredPost, setFilteredPost] = useState([]);
    const [filteredUser, setFilteredUser] = useState([]);
    const [filteredTag, setFilteredTag] = useState([]);
    
    useEffect(() => {
        axios
          .get('http://localhost:3001/posts/')
          .then(response => {
            console.log('Yeet posts are fetched!')
            setPost(response.data)
            setFilteredPost(response.data);
          })
          axios
          .get('http://localhost:3001/users/')
          .then(response => {
            console.log('Yeet users are fetched!')
            setUser(response.data)
            setFilteredUser(response.data);
          })
      }, [])

    const searchPosts = (event) => {
         setFilteredPost(post);
        if(event.target.value !== ""){
          setFilteredPost(post.filter((post) => {
            return post.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
          })
        )
      }}

      const searchTags = (event) => {
        setFilteredTag(post.category);
        if(event.target.value !== ""){
          setFilteredPost(post.filter((post) => {
            return post.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
          })
        )
      }}
    
      const searchUsers = (event) => {
        setFilteredUser(user);
       if(event.target.value !== ""){
         setFilteredUser(user.filter((user) => {
           return user.username.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
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
      <Card>
  <Card.Header>{props.post.category}</Card.Header>
  <Card.Body>
    <Card.Title>{props.post.username}</Card.Title>
    <Card.Text>
    {props.post.content}
    </Card.Text>
    <Link to={"/edit/"+props.post.id}>edit</Link> | <a href="#" onClick={() => {deletePost(props.post.id) }}>delete</a>
  </Card.Body>
</Card>
            // <tr>
            //   <td>{props.post.username}</td>
            //   <td>{props.post.content}</td>
            //   <td>{props.post.category}</td>
            //   <td>{props.post.date}</td>
            //   <td>
            //     <Link to={"/edit/"+props.post.id}>edit</Link> | <a href="#" onClick={() => {deletePost(props.post.id) }}>delete</a>
            //   </td>
            // </tr>
          )
    
    const User = props => {
      return (
        <div>
          {props.user.username}
        </div>
      )
    }

    const Tag = props => {
      return (
        <div>
          {props.post.category}
        </div>
      )
    }

    const PostHandler = () => {
        return filteredPost.map(post => {
            return <Post post={post} key={post.id}/>;
          })   
    }

    const UserHandler = () => {
      return filteredUser.map(post => {
          return <User user={user} key={user.id}/>;
        })   
  }

  const TagHandler = () => {
    return filteredTag.map(post => {
        return <Tag post={post} key={post.id}/>;
      })   
}

    return(
      <div>
      <Navigationbar />
      <br />
      <Container>
      <InputGroup className="mb-3">
    <FormControl
      placeholder="Search"
      aria-label="Search"
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append>
      <Button variant="outline-secondary">Search Icon</Button>
    </InputGroup.Append>
  </InputGroup>
  </Container>
  </div>
      ) 
}

export default SearchPosts;
