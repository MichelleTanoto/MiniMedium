import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { MDBCol, MDBFormInline, MDBIcon } from 'mdbreact';

const PostsList = () => {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [filteredPost, setFilteredPost] = useState([]);
    const [filteredUser, setFilteredUser] = useState([]);
    const [filteredTag, setFilteredTag] = useState([]);
    const [displayed, setDisplayed] = useState([]);
    const [flag, setFlag] = useState('');
    
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

    const search = (event) => {
         setFilteredPost(post);
         setFilteredUser(user);
         setFilteredTag(post.category);
        if(event.target.value !== ""){
          setFilteredPost(post.filter((post) => {
            return post.title.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
          }))

          setFilteredUser(user.filter((user) => {
            return user.username.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
          }))

          setFilteredTag(post.filter((post) => {
            return post.category.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
          }))
      }}
    
      // error
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

  const DisplaySearch = () => {
    switch(flag){
      case '1': 
      return displayed.map((d) => {
        return <div> {d.username} </div>
      })
      break;
      default:
        break;
    }
  }
    
    return (
        <div>
          <h3>Untitled Posts</h3>
           <div>
             <MDBCol md="6">
               <MDBFormInline className="md-form">
                 <MDBIcon icon="search" />
                 <input 
                  type="text" 
                  placeholder="Search Untitled" onChange={search}/>
               </MDBFormInline>
             </MDBCol>
                  <br/>
                  <a onClick= {() => {setFlag(1)}}> Stories </a>
                  <a onClick= {() => {setDisplayed(filteredUser)}}> Users </a>
                  <a onClick= {() => {setDisplayed(filteredTag)}}> Tags </a>
                  <DisplaySearch />
            </div>
        </div>
      ) 
}

export default PostsList;