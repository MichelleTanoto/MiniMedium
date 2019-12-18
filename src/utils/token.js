import axios from 'axios'
const baseUrl = 'http://localhost:3001/posts'

let token = null 

   const setToken = newToken => {
      token = `bearer ${newToken}`
   }

const create = newObject => {

  const config = {
    headers: { Authorization: token },
  }
  
  const request = axios.post(baseUrl, newObject, config)
  return request.then(response => response.data)
}

export default { setToken , create}
  