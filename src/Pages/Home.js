import React,{useEffect, useState} from 'react'
import DefaultLayout from '../Components/DefaultLayout'
import { collection, getDocs } from "firebase/firestore";
import { fireDB } from '../firebaseConfig';
import { useDispatch } from 'react-redux';
import Post from '../Components/Post';

function Home() {
  const [data,setData]=useState([])
  const dispatch=useDispatch()
  const getPosts = async () => {

    dispatch({type:'showLoading'})
    const temp=[]
    const querySnapshot = await getDocs(collection(fireDB, "posts"));
    querySnapshot.forEach((doc) => {
      temp.push({...doc.data(),id:doc.id})
     
     
    });
    
    setData(temp)
    dispatch({type:'hideLoading'})


  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <DefaultLayout>
      <div className='grid grid-cols-4 md:grid-cols-1'>
        {data.map((post)=>{
          return <Post post={post}/>
        })}
      </div>
      
    </DefaultLayout>

  )
}

export default Home