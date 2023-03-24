import React from 'react'
import {useState,useEffect} from "react"
import axios from "axios";
const Home = () => {
  
  const [allPosts,setPosts]=useState([{}]);
  
  async function getPosts(){
    const req = await axios.get('/posts');
    setPosts(req.data.posts);
    console.log(req.data.posts);
  }
  useEffect(()=>{
    getPosts();
  },[])

  return (
    <div>
       
    </div>
  )
}

export default Home