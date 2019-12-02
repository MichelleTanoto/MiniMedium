import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import PostsList from "./components/postsListComponent";
import EditPost from "./components/editPostComponent";
import CreatePost from "./components/createPostComponent";
import Login from "./components/loginComponent";
import Register from "./components/registerComponent";
import Home from "./components/homeComponent";

const App = () => {

  return(
    <Router>
      <>
        <Route path="/" exact component={PostsList} />
         {/* because there is other method using "/" path */}
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
