import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {app,fireDB} from '../firebaseConfig';
import { setDoc,doc } from "firebase/firestore";
import { useSelector,useDispatch } from 'react-redux'
import Loader from '../Components/Loader'
import {toast} from 'react-toastify'




function Register() {
    const navigate=useNavigate()
    const {loading}=useSelector((store)=>store)
    const dispatch=useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const register = () => {
        dispatch({type:"showLoading"})
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               
                const user = userCredential.user;
                const userData={
                    email:user.email,
                    profilePicUrl:'',
                    bio:'hi , i am using sheygram lite',

                }
                
                
                setDoc(doc(fireDB, "users", user.uid), userData);
                toast.success("Registration is Successfull")
                dispatch({type:"hideLoading"})

                navigate('/login')
                
            })
            .catch((error) => {
                toast.warn("Registration Failed")
                console.log(error)
                dispatch({type:"hideLoading"})

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
        <div className='h-screen flex  flex-col justify-between overflow-hidden bg-primary'>
            {loading && <Loader/>}
            <div className='flex justify-start'>
                <div className='h-40 w-96 bg-white -skew-x-12 -ml-10 flex justify-center items-center'>
                    <h1 className='text-center font-bold text-6xl skew-x-12 text-primary'>SHEY</h1>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='w-96 flex flex-col space-y-5 card p-5'>
                    <h1 className='text-4xl text-white font-semibold'>Get In</h1>
                    <hr />
                    <input type='input' className='border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-3 bg-transparent' placeholder='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type='input' className='border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-3 bg-transparent' placeholder='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <input type='input' className='border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-3 bg-transparent' placeholder='confirm password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    <div className='flex justify-end'>
                        <button className='bg-white text-primary px-3' onClick={register}>Register</button>
                    </div>
                    <hr />
                    <Link to='/login' className='text-white'>Already Registered? .Click Here to Login</Link>
                </div>

            </div>

            <div className='flex justify-end'>
                <div className='h-40 w-96 bg-white skew-x-12 -mr-10 flex justify-center items-center'>
                    <h1 className='text-center font-bold text-6xl -skew-x-12 text-primary'>GRAM</h1>
                </div>
            </div>
        </div>
    )
}

export default Register