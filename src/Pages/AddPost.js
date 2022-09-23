import React, { useState } from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {fireDB} from '../firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 
import {useNavigate} from 'react-router-dom'

function AddPost() {
  const [image, setImage] = useState('')
  const [description,setDescription]=useState('')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const onImageChange = (e) => {
    setImage(e.target.files[0])


  }

  const addPost = () => {
    dispatch({type:'showLoading'})
    const storage = getStorage();
    const storageRef = ref(storage, `/posts/${image.name}`);

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, image)
    .then((snapshot) => {
      
      getDownloadURL(ref(storage, `/posts/${image.name}`)).then((url)=>{
        // console.log(url);
        addDoc(collection(fireDB, "posts"),{
          description,
          imageURL:url,
          likes:[],
          comments:[],
          user:JSON.parse(localStorage.getItem('sheygram-lite-user'))
        } )
        .then(()=>{
          toast.success('post created Succesfully')
          dispatch({type:'hideLoading'})
          navigate('/')
        })
        .catch(()=>{
          toast.warn('Unable to create POST')
          dispatch({type:'hideLoading'})
        })

        
      
      })
    })
    .catch((error)=>{
      toast.error('error failed to upload the file')
    })
    

  }
  return (
    <DefaultLayout>
      <div>
        <h1 className='text-3xl font-semi-bold text-gray-600'>Add Post</h1>
        <div className='w-screen flex flex-col'>
          <textarea
           className='border-2 border-gray-500 border-dashed w-1/2 md:w-full my-5 '
            rows='5' 
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}
          ></textarea>
          <input type='file' onChange={(e) => { onImageChange(e) }} />
          {image && (
            <img src={URL.createObjectURL(image)} alt='' className='mt-5 h-32 w-32 rounded' />

          )}

        </div>
        {description&&image&&(
          <div className='flex justify-end'>
          <button className='bg-primary text-white px-3' onClick={addPost}>Add Post</button>
        </div>
        )}
        
        
      </div>

    </DefaultLayout>

  )
}

export default AddPost