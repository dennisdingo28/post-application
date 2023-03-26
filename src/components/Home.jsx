import React from 'react'
import {useState,useEffect} from "react"
import axios from "axios";
import { Link } from 'react-router-dom';

const Home = ({user,logged,setLogged}) => {
  
  const [allPosts,setPosts]=useState([{}]);
  console.log(allPosts);
  async function getPosts(){
    const req = await axios.get('/posts');
    setPosts(req.data.posts);
  }

  async function deletePost(postId){
    const token = localStorage.getItem('token')

    const req = await axios.delete(`/posts/${postId}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
  }
  


  useEffect(()=>{
    getPosts();

  },[])

  return (
    <div>
       <div>
        {logged ? 
          <div className='container mx-auto flex flex-col gap-40'>
            <div className="navbarContainer flex items-center text-center">
              <h1 className='font-bold text-[1.2em] sm:text-[1.5em] flex-[1]'>Hello,{user.name}</h1>
              <div className=''>
                <Link to={"/createPost"} className='bg-[#1e1e1e] text-white px-2 py-1 duration-[.20s] rounded-md hover:shadow-[0px_0px_5px_#1e1e1e] active:scale-[.90]'>Create Post</Link>
              </div>
            </div>

           
          </div>  
          :<h1>you are not logged in</h1>
        }
         <div className='flex justify-center items-center'>
              <div className='allPosts grid grid-cols-2 gap-2'>
                    {allPosts.map(post=>{
                      return (
                      <div key={post._id} className='post bg-[#b8e2f2] rounded-t-lg flex flex-col gap-2'>
                        {user.userId===post.createdBy ?  <div><Link to={`/updatePost/${post._id}`} className="bi bi-gear ml-auto cursor-pointer"></Link> <i type="submit" onClick={e=>deletePost(post._id)} className="cursor-pointer bi bi-trash2"></i></div>:""}
                        <p>name:{post.name}</p>
                        <p>createdBy:{post.createdBy}</p>
                        <p>description:{post.description}</p>
                      </div>
                      )
                    })}
              </div>
          </div>
       </div>
    </div>
  )
}

export default Home