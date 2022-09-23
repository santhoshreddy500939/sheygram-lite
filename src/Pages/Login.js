import React, { useEffect } from 'react'
import {useState} from 'react'
import { Link, Navigate, useNavigate} from 'react-router-dom'
import {app,fireDB} from '../firebaseConfig'
import {doc,getDoc} from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loader from '../Components/Loader';
import {toast} from 'react-toastify'
import { useSelector,useDispatch } from 'react-redux'


function Login() {
    const navigate=useNavigate()
    const {loading}=useSelector((store)=>store)
    const dispatch=useDispatch()
    console.log(loading)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = () => {
        dispatch({type:"showLoading"})
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               
                const user = userCredential.user;    
                    
                 getDoc(doc(fireDB, "users", user.uid)).then((user)=>{
                    console.log(user.data())
                    localStorage.setItem('sheygram-lite-user',JSON.stringify({...user.data(),id:user.id}))
                    navigate('/')
                    toast.success("Log In is Successfull")
                 })  
                        
                 dispatch({type:"hideLoading"})
                
            })
            .catch((error) => {
                console.log(error)
                toast.error("failed to login")
                // const errorCode = error.code;
                // const errorMessage = error.message;

                // console.log(errorMessage)
              
            });


    }

    useEffect(()=>{
        if(localStorage.getItem('sheygram-lite-user'))
        {
           navigate('/')
        }
    })
  return (
    <div className='h-screen flex  flex-col justify-between overflow-x-hidden'>
        <div className='flex justify-start'>
            <div className='h-40 w-96 bg-primary -skew-x-12 -ml-10 flex justify-center items-center'>
                <h1 className='text-center font-bold text-6xl skew-x-12 text-white'>SHEY</h1>
            </div>
        </div>
        
        <div className='flex justify-center'>
            {loading&&<Loader/>}
        <div className='w-96 flex flex-col space-y-5 card p-5'>
            <h1 className='text-4xl text-primary font-semibold'>Get In</h1>
            
            <hr/>
            <input type='input' className='border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-3' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='email' />
            <input type='input' className='border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-3' placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <div className='flex justify-end'>
                <button className='bg-primary text-white px-3' onClick={login}>LogIn</button>
            </div>
            <hr/>
            <Link to='/register' className='text-primary'>Not Yet Registered .Click Here to register</Link>
        </div>

        </div>
        
        <div className='flex justify-end'>
            <div className='h-40 w-96 bg-primary skew-x-12 -mr-10 flex justify-center items-center'>
                <h1 className='text-center font-bold text-6xl -skew-x-12 text-white'>GRAM</h1>
            </div>
        </div>
    </div>
  )
}

export default Login