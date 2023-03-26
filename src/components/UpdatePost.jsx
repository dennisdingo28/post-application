import React from 'react'
import { useState,useRef} from 'react'
import { useParams, } from 'react-router-dom';
import axios from "axios";

const UpdatePost = () => {
    const newInput = useRef();
    const {postId}=useParams();
    const [oldPost,setOldPost] = useState("");
    const [formStatus,setStatus]=useState("");
    
    decodePost(postId);

    async function decodePost(id){
        const req = await axios.post('https://post-application-server-production.up.railway.app/decodePost',{id});
        setOldPost(req.data.description);
    }
    
    async function updatePost(){
        setStatus('Loading...')
        const token = localStorage.getItem('token');
      const req = await axios.patch(`https://post-application-server-production.up.railway.app/posts/${postId}`,{description:newInput.current.value},{
        headers:{
            Authorization:`Bearer ${token}`
        }
      });
    setStatus('Updated successfully');
    setTimeout(clear);
    }

    function clear() {
      setTimeout(() => {
        setStatus("")
      }, 2500);
    }

  return (
    <div>
      <div className='bg-gray-600'>
        <p>Post ID : {postId}</p>
        <p>Current description : {oldPost}</p>

        <label htmlFor='description'>Add new description:</label>
        <input type="text" id='description' ref={newInput}/>


        <button onClick={updatePost} className='bg-gray-400 duration-[.21s] text-white font-medium rounded-lg hover:shadow-[0px_0px_5px_gray] px-2 py-1 text-[.9em]'>Update</button>
        <p>{formStatus}</p>
      </div>
    </div>
  )
}

export default UpdatePost