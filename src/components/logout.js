import React, {useState, useEffect} from 'react';

const Logout = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      console.log(user.username);
      console.log(user);
      window.localStorage.removeItem('loggedOutUser');
      window.localStorage.clear();
        
    } 
}, [])

    if(user){
        return(
            <div>
                {user.username} have successfully log out. Redirecting....
                {setTimeout(() => {
                 window.location="/register";
                },5000)}
            </div>
        )
    }
    return(
        <div>
            Unsuccessful Log out try again.
        </div>
    )
}

export default Logout;