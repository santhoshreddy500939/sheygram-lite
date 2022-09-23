import React from 'react'
import {FcLike} from 'react-icons/fc'
import {FaRegComments} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom'

function Post({post}) {
    const navigate=useNavigate()
    // console.log(post)
    const getUserName=()=>{
        const email=post.user.email
        const userName=email.substring(0,email.length-10)
        return userName

    }
  return (
    <div onClick={()=>{navigate(`/post/${post.id}`)}} className='cursor-pointer'>
        <div className='flex item items-center card-sm p-2'>
            <div className='h-10 w-10 rounded-full bg-gray-500 text-white justify-center items-center'>
                <span className='text-2xl'>
                    {getUserName()[0]}
                </span>
            </div>
            <div>{getUserName()}</div>

        </div>
        <div> 
        <img src={post.imageURL} alt='' className='h-60 w-60'/>
        <h1 className='text-gray-500 text-left my-2 p-1'>{post.description}</h1>

        </div>
        
        <div className='card-sm p-2 flex'>
            <div>
            <FcLike/>
            <h1>{post.likes.length}</h1>
            </div>
            <div>
            <FaRegComments/>
            <h1>{post.comments.length}</h1>
            </div>
           
           
        </div>

    </div>
  )
}

export default Post