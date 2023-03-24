import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const Register = () => {
  const [controll,setControll] = useState({
    username:"",
    email:"",
    password:"",
    agreeTerms:false
  });

  const [notEmpty,setEmpty]= useState({
    username:true,
    email:true,
    password:true,
    agreeTerms:true
  })
  
  async function createAccount(e){
    e.preventDefault();
    if(!controll.username){
        setEmpty(prevState=>{
            return{
                ...prevState,
                username:false
            }
        })
    }
    if(!controll.email){
        setEmpty(prevState=>{
            return{
                ...prevState,
                email:false
            }
        })
    }
    if(!controll.password){
        setEmpty(prevState=>{
            return{
                ...prevState,
                password:false
            }
        })
    }
    if(controll.agreeTerms==false){
        setEmpty(prevState=>{
            return{
                ...prevState,
                agreeTerms:false
            }
        })
    }
    if(notEmpty.username && notEmpty.email && notEmpty.password && notEmpty.agreeTerms){
        e.preventDefault();
        const request = await axios.post("/auth/register",{name:controll.username,email:controll.email,password:controll.password,agreeTerms:controll.agreeTerms});
        console.log(request);
    }
    else
    {

    }
    
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
                        className="w-[90%] mx-auto outline-none bg-transparent border-b-[0.1rem]" 
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
                    {!notEmpty.username && <i class="bi bi-person-exclamation"></i>}
                </div>
                <div className='flex items-center gap-1'>
                    <label htmlFor='email' className=''><i className="bi bi-envelope-at"></i></label>
                    <input 
                        type="email" 
                        className="w-[90%] mx-auto outline-none bg-transparent border-b-[0.1rem]" 
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
                    {!notEmpty.email && <i className="bi bi-send-exclamation-fill"></i>
}
                </div>
                <div className='flex items-center gap-1'>
                    <label htmlFor='password' className=''><i className="bi bi-shield-lock text-[##6a4dc4"></i></label>
                    <input 
                        type="password" 
                        className="w-[90%] mx-auto outline-none bg-transparent border-b-[0.1rem]" 
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
                    {!notEmpty.password && <i class="bi bi-exclamation-square"></i>}
                </div>
            </div>
            <div className='formFooter'>
                <div className='flex items-center justify-center gap-2'>
                    <div onClick={()=>setControll(prevState=>{
                        return {
                            ...prevState,
                            agreeTerms:!controll.agreeTerms
                        }
                    })} className={`duration-100 flex items-center justify-center ${controll.agreeTerms ? "bg-[#6a4dc4]":""} checkbox w-[20px] h-[20px] rounded-lg bg-white cursor-pointer`}>
                        {controll.agreeTerms && <i className='bi bi-check bg-transparent text-white'></i>}
                    </div>
                    <p className="cursor-pointer font-light text-[0.9rem]">I Agree with Terms&Conditions</p>
                </div>
                
                <div className='text-center mt-4 mb-2'>
                    <button onClick={createAccount} type='submit' className='bg-[#8b8cc7] duration-[.13s] cursor-pointer active:scale-[.90] text-softBlueGray rounded-md px-3 py-1'>Submit</button>
                    <p className='formStatus font-medium text-[.8em] mt-2'>Account was successfully created !</p>
                </div>
            </div>
         </form>
    </div>
  )
}

export default Register;