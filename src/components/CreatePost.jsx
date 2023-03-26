import React, { useState } from 'react';
import axios from "axios";

const CreatePost = ({user,token}) => {

    const [desc,setDesc]=useState("");
    const [formStatus,setFormStatus]=useState("");

    function validateInput(){
        if(desc.trim()!=='')
            return true;
        return false;
    }
   async function createPost() {
        setFormStatus("Loading...")

        if(validateInput()){
            const req = await axios.post('/posts',{name:user.name,description:desc},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setFormStatus(req.data.msg)
        }else{
            setFormStatus('You must enter valid data');
            
        }            
        setTimeout(clearPost,2000);
    }
    function clearPost(){
        setFormStatus("");
        setDesc("");

    }
  return (

    <div className='min-h-[100vh] flex items-center justify-center'>
        <form  className='bg-[#1e1e1e] p-2 text-white w-[100%] max-w-[400px] rounded-t-sm flex flex-col gap-5'>
            <h2 className='font-bold text-center text-[1.1em] sm:text-[1.2em]'>Username: {user.name}</h2>
            <div>
                <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='description' className='bg-transparent border-l border-r resize-none outline-none w-[100%] px-1' rows={5}>  

                </textarea>
            </div>  
            <button type='submit' onClick={createPost} className='bg-white text-black px-2 py-1 duration-[.20s] rounded-md hover:shadow-[0px_0px_5px_white] active:scale-[.90]'>Create Post</button>
            <p className='text-center formStatus font-thin'>{formStatus}</p>
        </form>
    </div>

    )
}

export default CreatePost