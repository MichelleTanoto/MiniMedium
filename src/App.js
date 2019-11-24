import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Navbar from "./components/navbarComponent";
import PostsList from "./components/postsListComponent";
import EditPost from "./components/editPostComponent";
import CreatePost from "./components/createPostComponent";
import CreateUser from "./components/createUserComponent";

const App = () => {

  return(
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={PostsList} />
         {/* because there is other method using "/" path */}
         <Route path="/edit/:id" component={EditPost} />
        <Route path="/create" component={CreatePost} />
        <Route path="/user" component={CreateUser} />
        </div>
     </Router>
  )
}
export default App;
