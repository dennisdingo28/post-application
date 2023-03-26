import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import {useState,useEffect} from "react";
import CreatePost from './components/CreatePost';
import UpdatePost from './components/UpdatePost';
import axios from "axios";

function App() {

  const [logged,setLogged]=useState(function(){return localStorage.getItem('token') ? true:false});

  const [token,setToken]=useState(function(){return localStorage.getItem('token') || ""})

  const [user,setUser]=useState({});

  async function decodeUser(token){
    const req = await axios.post('/decode',{},{headers:{
      Authorization:`Bearer ${token}`
    }});
    setUser(req.data);
  }

  useEffect(()=>{
    if(logged){
      const token = localStorage.getItem('token');
      decodeUser(token);
    }
  },[])

  return (
    <Router>
      <div className='min-h-[100vh] bg-softBlueGray px-2 py-4'>
        <Routes>
          <Route path='/' element={<Home user={user} logged={logged} setLogged={setLogged}/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login setLogged={setLogged}/>}/>
          <Route path='/createPost' element={<CreatePost user={user} token={token}/>}/>
          <Route path='/updatePost/:postId' element={<UpdatePost/>}/>
        </Routes>
      </div>
    </Router>
  );
}


export default App;