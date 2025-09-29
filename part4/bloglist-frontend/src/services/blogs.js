import axios from 'axios'
const baseUrl = '/api/blogs'
let token=null;
const setToken=(newToken)=>{
   token=`Bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data.sort((a,b)=>b.likes-a.likes))
}
const updateLikes = async (id, newLikes) => {
  const response = await axios.put(`${baseUrl}/${id}`, { likes: newLikes });
  return response.data;
};

const create=async(newNote)=>{
  const config={
    headers: {Authorization:token}
}
   const request = await axios.post(baseUrl,newNote,config)
   return request.data
}
export default { getAll ,create, setToken,updateLikes}