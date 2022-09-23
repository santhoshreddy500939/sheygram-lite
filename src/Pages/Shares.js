import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { collection, getDoc,doc, getDocs } from "firebase/firestore";
import { fireDB } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import Post from '../Components/Post';

function Shares() {
    const [data, setData] = useState([])
    const logginedUser = JSON.parse(localStorage.getItem('sheygram-lite-user'))
    const dispatch = useDispatch()
    const getPosts = async () => {

        dispatch({ type: 'showLoading' })
        const temp = []
        const result = await getDoc(doc(fireDB, "users", logginedUser.id));

        console.log(result.data().shares)
        setData(result.data().shares);
        dispatch({ type: 'hideLoading' })


    }
    useEffect(() => {
        getPosts()
    }, [])
    return (
        <DefaultLayout>
            <div className='grid grid-cols-4 md:grid-cols-1'>
                {data.map((post) => {
                    return <div>
                            <Post post={post} />
                            <h1 className='mt-2 text-gray-500'>sharedBy:{post.sharedBy.email}</h1>
                            </div>
                })}
            </div>

        </DefaultLayout>

    )
}

export default Shares