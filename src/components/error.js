import React from 'react';
import Alert from 'react-bootstrap/Alert';

const Error = ({message}) =>{
    if(message === null){
        return null
    }

    return(
        <div className="error">
          {message}
        </div>
    )
}

export default Error;