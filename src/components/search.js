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
    
    var option = 'stories';

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
        if(event.target.value !== ""){
          setFilteredPost(post.filter((post) => {
            return post.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
          })
        )
        setFilteredTag(post.filter((post) => {
          return post.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
        })
        )
        setFilteredUser(user.filter((user) => {
          return user.username.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
        })
      )
      }}

    const Post = props => (
      <Container>
      <div>
        <p> {props.post.date}</p>
        <h3> {props.post.title}</h3>
        <p> {props.post.content}</p>
        <hr />
        <br />
      </div>
      </Container>
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

   const DisplayResult = () => {
     if(option === 'stories'){
       return (
       <div>
             <PostHandler />
       </div>
       )
     }
     else if(option === 'tags'){
       return  (
       <div>
         <TagHandler />
         </div>
       )
     }
     else if(option === 'people'){
       return (
       <div>
           <UserHandler />
         </div>
       )
     }
   }

   const toggle = (str) => {
     option = str;
     console.log(option);
   }

    return(
      <div>
      <Navigationbar />
      <br />
      <Container>
      {/* <InputGroup className="mb-3">
    <FormControl
      placeholder="Search"
      aria-label="Search"
      aria-describedby="basic-addon2"
    />
    <InputGroup.Append>
      <Button variant="outline-secondary">Search Icon</Button>
    </InputGroup.Append>
  </InputGroup> */}
  <input type="text" classNAme="search" onChange={searchPosts}/>
  </Container>
    <button onClick={toggle('stories')}>Stories</button>
    <button onClick={toggle('tags')}>Tags</button>
    <button onClick={toggle('people')}>People</button>
    <DisplayResult />
  </div>
      ) 
}

export default SearchPosts;
