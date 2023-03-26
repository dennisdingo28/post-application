import React from 'react'
import { useState,useRef} from 'react'
import axios from 'axios';

const Register = () => {

  const formStatus = useRef();
    
  const [controll,setControll] = useState({
    username:"",
    email:"",
    password:"",
    agreeTerms:false
  });

  const [inputStatus,setInputStatus]=useState(false);
    

  function checkEmpty(text){
    if(text==='')
        return true;
    return false;
  }

  function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }


  async function createAccount(e){
    e.preventDefault();
    setInputStatus(true);

    if(!checkEmpty(controll.username) && isEmail(controll.email) && !checkEmpty(controll.password)){
        try{
            formStatus.current.textContent = "Loading..."
            const req = await axios.post('/auth/register',{name:controll.username,email:controll.email,password:controll.password,agreeTerms:controll.agreeTerms});
            formStatus.current.textContent="Account was successfully created";
        }
        catch(error){
            console.log(error);
            formStatus.current.textContent = "There was an error.Please try again later!";               
        }
    }
    else{   
        formStatus.current.textContent = "You must enter valid data"       
    }

    //refresh
    setTimeout(()=>{
        setInputStatus(false);
        formStatus.current.textContent="";
        setControll({
            username:"",
            email:"",
            password:"",
            agreeTerms:false
        })
    },3000)
  }
  
  return (
    <div className='min-h-[100vh] flex items-center justify-center max-w-[600px] mx-auto'>
        <form className='bg-[#bdbde6] rounded-t-sm w-[100%] px-3 py-1 flex flex-col gap-8'>
            <div className='formHeader'>
                <h1 className='text-[1.20em] tracking-wide font-medium'>Create an account</h1>
            </div>
            <div className='formBody flex flex-col gap-5'>
                <div className='flex items-center'>
                    <label htmlFor='username' className=''><i className="bi bi-person"></i></label>
                    <input 
                        type="text" 
                        className="w-[90%] mx-auto outline-none placeholder-gray-500 bg-transparent border-b-[0.1rem]" 
                        id="username" 
                        placeholder='username'
                        onChange={e=>setControll(prevState=>{
                            return {
                                ...prevState,
                                username:e.target.value
                            }
                        })}
                        value={controll.username}
                    />
                    {inputStatus ? controll.username.trim()==='' ? <i className="bi bi-exclamation-lg text-red-600"></i>:<i className="bi bi-check-lg text-green-600"></i>:""}
                </div>
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
                    {inputStatus ? !isEmail(controll.email)? <i className="bi bi-exclamation-lg text-red-600"></i>:<i className="bi bi-check-lg text-green-600"></i>:""}
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
                    {inputStatus ? controll.password.trim()==='' ? <i className="bi bi-exclamation-lg text-red-600"></i>:<i className="bi bi-check-lg text-green-600"></i>:""}
                </div>
            </div>
            <div className='formFooter'>
                <div className='flex items-center justify-center gap-2' onClick={()=>setControll(prevState=>{
                        return {
                            ...prevState,
                            agreeTerms:!controll.agreeTerms
                        }
                    })} >
                    <div className={`duration-100 flex items-center justify-center ${controll.agreeTerms ? "bg-[#6a4dc4]":"bg-white"} checkbox w-[20px] h-[20px] rounded-lg cursor-pointer`}>
                        {controll.agreeTerms && <i className='bi bi-check bg-transparent text-white'></i>}
                    </div>
                    <p className="cursor-pointer font-light text-[0.9rem]">I Agree with Terms&Conditions</p>
                </div>
                
                <div className='text-center mt-4 mb-2'>
                    <button onClick={createAccount} type='submit' className='bg-[#7778b4] duration-[.13s] cursor-pointer active:scale-[.90] text-softBlueGray rounded-md px-3 py-1'>Submit</button>
                    <p ref={formStatus} className='formStatus font-medium text-[.8em] mt-2'></p>
                </div>
            </div>
         </form>
    </div>
  )
}

export default Register;