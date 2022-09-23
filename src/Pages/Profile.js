import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { fireDB } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import Post from '../Components/Post';
import { useParams } from 'react-router-dom';

function Profile() {
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()
    const params = useParams()
    const [user, setUser] = useState(null)
    const getPosts = async () => {

        dispatch({ type: 'showLoading' })
        const temp = []
        const querySnapshot = await getDocs(collection(fireDB, "posts"));
        querySnapshot.forEach((doc) => {
            temp.push({ ...doc.data(), id: doc.id })


        });




        const filteredPosts = temp.filter((post) => post.user.id === params.id)
        setPosts(filteredPosts)


        dispatch({ type: 'hideLoading' })


    }
    const getUser = async () => {
        const result = await getDoc(doc(fireDB, 'users', params.id))
        setUser(result.data())

    }
    useEffect(() => {
        getPosts()
        getUser()

    }, [])
    const getUserName = (text) => {
        // const email = post.user.email
        const email = text;
        const userName = email.substring(0, email.length - 10)
        return userName

    }
    return (
        <DefaultLayout>
            {user && (
                <div>
                    <div>
                        {/* profileusernamedetails */}
                        <div className='flex item items-center card-sm p-2'>
                            <div className='h-10 w-10 rounded-full bg-gray-500 text-white justify-center items-center'>
                                <span className='text-2xl'>
                                    {getUserName(user.email)[0]}
                                </span>
                            </div>
                            <div>{getUserName(user.email)}</div>

                        </div>

                    </div>
                    <div className='mt-10'>
                        <div className='card-sm p-2'>
                            <h1>post Uploaded by {getUserName(user.email)}</h1>

                        </div>
                        <div className='grid grid-cols-4 md:grid-cols-1'>
                            {posts.map((post) => {
                                return <Post post={post} />
                            })}
                        </div>


                    </div>
                </div>


            )}

        </DefaultLayout>

    )
}

export default Profile