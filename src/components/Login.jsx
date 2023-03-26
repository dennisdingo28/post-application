import React from 'react'
import { useState,useRef} from 'react'
import axios from 'axios';

const Login = ({setLogged}) => {

  const formStatus = useRef();
    
  const [controll,setControll] = useState({
    email:"",
    password:""
  });
    

  function checkEmpty(text){
    if(text==='')
        return true;
    return false;
  }

  function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }


  async function loginAccount(e){
    e.preventDefault();
    if(isEmail(controll.email) && !checkEmpty(controll.password)){
        try{
            formStatus.current.textContent = "Loading..."
            const req = await axios.post('https://post-application-server-production.up.railway.app/auth/login',{email:controll.email,password:controll.password});
            localStorage.setItem('token',req.data.token);
            formStatus.current.textContent="Successfully logged in!";
            setLogged(true);
        }
        catch(error){ 
            console.log(error);
            formStatus.current.textContent = error.response.data.msg;               
        }
    }
    else{   
        formStatus.current.textContent = "You must enter valid data"       
    }

    //refresh
    setTimeout(()=>{
        formStatus.current.textContent="";
        setControll({
            email:"",
            password:""
        })
    },3000)
  }
  
  return (
    <div className='min-h-[100vh] flex items-center justify-center max-w-[600px] mx-auto'>
        <form className='bg-[#bdbde6] rounded-t-sm w-[100%] px-3 py-1 flex flex-col gap-8'>
            <div className='formHeader'>
                <h1 className='text-[1.20em] tracking-wide font-medium'>Login</h1>
            </div>
            <div className='formBody flex flex-col gap-5'>
                <div className='flex items-center gap-1'>
                    <label htmlFor='email' className=''><i className="bi bi-envelope-at"></i></label>
                    <input 
                        type="email" 
                        className="w-[90%] mx-auto outline-none placeholder-gray-500 bg-transparent border-b-[0.1rem]" 
                        id="email" 
                        placeholder='email'
                        onChange={e=>setControll(prevState=>{
                            return{
                                ...prevState,
                                email:e.target.value
                            }
                        })}
                        value={controll.email}
                    />
                </div>
                <div className='flex items-center gap-1'>
                    <label htmlFor='password' className=''><i className="bi bi-shield-lock text-[##6a4dc4"></i></label>
                    <input 
                        type="password" 
                        className="w-[90%] placeholder-gray-500 mx-auto outline-none bg-transparent border-b-[0.1rem]" 
                        id="password" 
                        placeholder='password'
                        onChange={e=>setControll(prevState=>{
                            return{
                                ...prevState,
                                password:e.target.value
                            }
                        })}    
                        value={controll.password}
                    />
                </div>
            </div>
            <div className='formFooter'>
                <div className='text-center mt-4 mb-2'>
                    <button onClick={loginAccount} type='submit' className='bg-[#7778b4] duration-[.13s] cursor-pointer active:scale-[.90] text-softBlueGray rounded-md px-3 py-1'>Log In</button>
                    <p ref={formStatus} className='formStatus font-medium text-[.8em] mt-2'></p>
                </div>
            </div>
         </form>
    </div>
  )
}

export default Login;