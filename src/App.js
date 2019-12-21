import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import EditPost from "./components/editPost";
import CreatePost from "./components/createPost";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import SearchPosts from './components/search';
import Posts from './components/posts';
import About from './components/about';
import Logout from './components/logout';
import Message from './components/message';

const App = () => {

  return(
    <Router>
      <>
      <Route path="/" exact component={Register} />
        <Route path="/search" exact component={SearchPosts} />
         <Route path="/edit/:id" component={EditPost} />
        <Route path="/create" component={CreatePost} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        <Route path="/posts" component={Posts} />
        <Route path="/about" component={About} />
        <Route path="/message" component={Message} /> 
        </>
     </Router>
  )
}
export default App;
