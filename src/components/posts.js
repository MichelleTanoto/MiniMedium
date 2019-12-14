import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Posts = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser')
        if (loggedUserJSON) {
          console.log(loggedUserJSON);
          setUser(JSON.parse(loggedUserJSON));
        }
      }, [])

    return(
        <div>
            <h2> Your Stories </h2>
        </div>
    )
}

export default Posts;