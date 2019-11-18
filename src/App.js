import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);
  const [post, setPost] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [filtered, setFiltered] = useState(post);

  useEffect(() => {
    axios
      .get('http://localhost:3001/posts') // might change the url
      .then(response => {
        console.log('promise fulfilled')
        setPost(response.data)
      })
  }, [])

// Post event changes handling
const handlePostChange = (event) => {
  console.log(event.target.value)
  setNewPost(event.target.value)
}

// Post basic functionality
  const addPost = (event) => {
    event.preventDefault()
    const postObject = {
      content: newPost,
      date: new Date().toISOString(),
      id: post.length + 1,
    }

  axios
  .post('http://localhost:3001/posts', postObject)
  .then(response => {
    setPost(post.concat(postObject));
    console.log(post);
  })
  setNewPost('');
  }

  const searchPosts = (event) => {
    if(event.target.value !== ""){
      setFiltered(filtered.filter((post) => {
        post.toLowerCase().includes(event.target.value.toLowerCase());
      })
      )}
  }

  const deletePosts = (event,id) => { // not sure about the parameter
    event.preventDefault();
    let afterDeletion = post;
    afterDeletion.some((el,i) => {
      if(el === id){
        afterDeletion.splice(i,1);
        return true;
      }
    })

    setPost(afterDeletion);

    axios
    .delete('http://localhost:3001/posts', {params: {id: id} })
    .then(res => {
      console.log(res);
    }) 
    }

  const DisplayPosts = (props) => {
    props.input.map(post => {
      return(
      <li key={post.id}> {post.content} {post.date}>
      <span onClick={() => deletePosts(post.id)} />
      </li>
      )
    })
  }

  const postLikes = () => {

  }

  const postComments = () => {

  }


  return(
    <div>
    <h1>Posts</h1>
    <div>
      <input 
      type="text" 
      placeholder="Search..." onChange={searchPosts}/>
    </div>
    <DisplayPosts input={filtered} />
    <div>
    <form onSubmit={addPost}>
      <input
        value={newPost} 
        onChange={handlePostChange}
      />
      <button type="submit">Add Post</button>
    </form>
    <DisplayPosts input={post} />
    </div>
  </div>
  )
}

export default App;
