import React from 'react'
import {useState,useEffect} from "react"
import axios from "axios";
import { Link } from 'react-router-dom';

const Home = ({user,logged,setLogged}) => {
  
  const [allPosts,setPosts]=useState([{}]);

  async function getPosts(){
    const req = await axios.get('/posts');
    setPosts(req.data.posts);
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
              <h1 className='font-bold text-[1.2em] sm:text-[1.5em] flex-[1]'>Hello,{user}</h1>
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
                      <div key={post._id} className='post bg-[#b8e2f2] rounded-t-lg'>
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