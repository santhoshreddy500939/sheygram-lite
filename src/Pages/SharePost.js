import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { fireDB } from '../firebaseConfig';
import { useDispatch } from 'react-redux';

import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function SharePost() {
    const [data, setData] = useState([])
    const [selectedUsers, setSelectedUsers] = useState([])
    const dispatch = useDispatch()
    const params = useParams()
    const [post, setPost] = useState(null)
    const navigate=useNavigate()
    const getUsers = async () => {

        dispatch({ type: 'showLoading' })
        const temp = []
        const querySnapshot = await getDocs(collection(fireDB, "users"));
        querySnapshot.forEach((doc) => {
            temp.push({ ...doc.data(), id: doc.id })


        });

        setData(temp)
        dispatch({ type: 'hideLoading' })


    }

    const getPost = () => {
        dispatch({ type: 'showLoading' })
        getDoc(doc(fireDB, 'posts', params.id))
            .then((doc) => {
                // console.log(doc.data())
                // console.log(currentUser.id)

                setPost({ ...doc.data(), id: doc.id })

                dispatch({ type: 'hideLoading' })

            })
            .catch(() => {
                dispatch({ type: 'hideLoading' })
            })


    }
    useEffect(() => {
        getUsers()
        getPost()
    }, [])

    const getUserName = (text) => {
        // const email = post.user.email
        const email = text;
        const userName = email.substring(0, email.length - 10)
        return userName

    }

    const addOrRemoveUser = (user) => {
       
        if (selectedUsers.find((obj) => obj.id === user.id)) {
           const temp = selectedUsers.filter((obj) => obj.id !== user.id)
            setSelectedUsers(temp)
        }
        else {
            const temp = [...selectedUsers]
            temp.push(user)
            setSelectedUsers(temp)
        }

        

    }

    const sharePost=()=>{
        selectedUsers.forEach((user)=>{
            dispatch({type:'showLoading'})
            const tempShares=user.shares??[]
            tempShares.push(
                {
                    ...post,
                    sharedBy:JSON.parse(localStorage.getItem('sheygram-lite-user'))
                }
            )

            setDoc(doc(fireDB,'users',user.id),{...user,shares:tempShares}).then(()=>{
                dispatch({type:'hideLoading'})
            })

            toast.success('Post Shared Successfully');
            navigate('/')

        })
    }
    return (
        <DefaultLayout>
            {post && data && (<div className='space-y-2'>
                <div>
                    <img src={post.imageURL} alt='' className='w-60 h-60' />
                </div>
                <h1 className='text-start text-gray-500'>Select users</h1>
                <div className='grid grid-cols-5 md:grid-cols-1 gap-5'>
                    {data.map((user) => {
                        const alreadySelected = selectedUsers.find((obj) => obj.id === user.id);
                        return <div className={`card p-5 ${alreadySelected && 'border-4 border-blue-500'}`} onClick={() => { addOrRemoveUser(user) }}>
                            <div className='h-10 w-10 rounded-full bg-gray-500 text-white justify-center items-center'>
                                <span className='text-2xl'>
                                    {getUserName(user.email)[0]}
                                </span>
                            </div>
                            <h1 className='text-xl'>{getUserName(user.email)}</h1>
                        </div>
                    })}
                </div>
                <button className='bg-primary text-white px-3' onClick={sharePost}>Share</button>

            </div>

            )
            }

        </DefaultLayout>
    )
}

export default SharePost