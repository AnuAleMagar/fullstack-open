import axios from 'axios'
const baseUrl = '/api/blogs'
const baseUrlLogin = '/api/login'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const login=async (newObject)=>{
   const request=await axios.post(baseUrlLogin,newObject)
   return request.data
}
export default { getAll ,login}