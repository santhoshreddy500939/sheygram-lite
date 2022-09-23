
import React, { useEffect, useState } from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import {useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { fireDB } from '../firebaseConfig'
import { useDispatch } from 'react-redux'
import { FcLike } from 'react-icons/fc'
import { MdCancel } from 'react-icons/md'
import { FaRegComments } from 'react-icons/fa'
import { toast } from 'react-toastify'
import moment from 'moment/moment'
import {IoIosShareAlt} from 'react-icons/io'


function PostDesc() {
    const currentUser = JSON.parse(localStorage.getItem('sheygram-lite-user'))
    const [post, setPost] = useState(null)
    const params = useParams();
    const dispatch = useDispatch()
    const [showLikes, setShowLikes] = useState(false)
    const [alreadyLiked, setAlreadyLiked] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [commentText,setCommentText]=useState('')
    const navigate=useNavigate()

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        dispatch({ type: 'showLoading' })
        getDoc(doc(fireDB, 'posts', params.id))
            .then((doc) => {
                // console.log(doc.data())
                // console.log(currentUser.id)

                setPost({ ...doc.data(), id: doc.id })
                if (doc.data().likes.find((like) => like.id === currentUser.id)) {
                    setAlreadyLiked(true)


                }
                else {
                    setAlreadyLiked(false)
                }
                dispatch({ type: 'hideLoading' })

            })
            .catch(() => {
                dispatch({ type: 'hideLoading' })
            })


    }

    const likeOrUnlike = () => {
        let upDatedLikes = post.likes;
        if (alreadyLiked) {
            upDatedLikes = post.likes.filter((user) => user.id !== currentUser.id)
            console.log("hello")

        }
        else {
            upDatedLikes.push(
                {
                    id: currentUser.id,
                    email: currentUser.email
                }
            )

        }

        setDoc(doc(fireDB, 'posts', post.id), { ...post, likes: upDatedLikes })
            .then(() => {
                getData()
                toast.success('Liked Succesfully')
            })
            .catch(() => {
                toast.error('failed to like')
            })

    }


    const getUserName = (text) => {
        // const email = post.user.email
        const email = text;
        const userName = email.substring(0, email.length - 10)
        return userName

    }

    const addComments=()=>{
        let upDatedComments = post.comments;
        
            upDatedComments.push(
                {
                    id: currentUser.id,
                    email: currentUser.email,
                    commentText,
                    createdOn:moment().format('DD-MM-YYYY')
                }
            )

        

        setDoc(doc(fireDB, 'posts', post.id), { ...post, comments: upDatedComments })
            .then(() => {
                getData()
            })
            .catch(() => {
                toast.error('error occured')
            })



    }
    return (
        <DefaultLayout>
            {post && (
                <div className='flex flex-row'>
                     <>
                    {/* likes list */}
                    {showLikes && (
                        <div className='w-96 m-5'>
                            <div>
                                <h1>liked by</h1>
                                <MdCancel className='cursor-pointer' onClick={() => { setShowLikes(false) }} />
                            </div>

                            <hr />
                            {post.likes.map((like) => {
                                return (<div className='flex item items-center card-sm p-2'>
                                    <div className='h-10 w-10 rounded-full bg-gray-500 text-white justify-center items-center'>
                                        <span className='text-2xl'>
                                            {getUserName(like.email)[0]}
                                        </span>
                                    </div>
                                    <div>{getUserName(like.email)}</div>

                                </div>)

                            })}
                        </div>

                    )}

                    {/* PostDescription */}
                    <div className='cursor-pointer h-[400px] w-[600px]'>
                        <div className='flex item items-center card-sm p-2'>
                            <div className='h-10 w-10 rounded-full bg-gray-500 text-white justify-center items-center'>
                                <span className='text-2xl'>
                                    {getUserName(post.user.email)[0]}
                                </span>
                            </div>
                            <div>{getUserName(post.user.email)}</div>

                        </div>
                        <img src={post.imageURL} alt='' className='h-full w-full' />
                        <div className='card-sm p-2 flex'>
                            <div>
                                <FcLike onClick={likeOrUnlike} color={alreadyLiked ? 'red' : 'gray'} />
                                <h1 className='underline cursor-pointer font-bold' onClick={() => { setShowLikes(true) }}>{post.likes.length}</h1>
                            </div>
                            <div>
                                <FaRegComments />
                                <h1 className='underline text-xl cursor-pointer' onClick={()=>{setShowComments(true)}}>{post.comments.length}</h1>
                            </div>
                            <div>
                                <IoIosShareAlt onClick={()=>{navigate(`/sharepost/${post.id}`)}} className='cursor-poniter'/>
                               
                            </div>


                        </div>

                    </div>
                    {/* comment section */}
                    {showComments &&
                        (<div className='w-96'>
                            {post.comments.map((comment)=>{
                                return (
                                    <div className='card-sm mt-2'>
                                        <h1 className='text-xl'>{comment.commentText}</h1>
                                        <hr/>
                                        <h1 className='text-right text-md'>By {getUserName(comment.email)} on {comment.createdOn}</h1>
                                    </div>
                                )
                            })}

                            <div className='flex flex-col'>
                                <textarea rows='2' className='border-dashed border-2 border-gray-500 md:w-full my-5 p-5'
                                 value={commentText} 
                                 onChange={(e)=>setCommentText(e.target.value)}></textarea>

                                <button className='bg-primary text-white px-3 w-4/12' onClick={addComments}>Add</button>
                            </div>

                        </div>)
                    }

                </>

                </div>
               
            )}
        </DefaultLayout>

    )
}

export default PostDesc
