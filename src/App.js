import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import EditPost from "./components/editPost";
import CreatePost from "./components/createPost";
import Login from "./components/login";
import Register from "./components/register";
import Home from "./components/home";
import SearchPosts from './components/search';
import Notification from './components/notification';

const App = () => {

  return(
    <Router>
      <>
        <Route path="/search" exact component={SearchPosts} />
         <Route path="/edit/:id" component={EditPost} />
        <Route path="/create" component={CreatePost} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
        </>
     </Router>
  )
}
export default App;
