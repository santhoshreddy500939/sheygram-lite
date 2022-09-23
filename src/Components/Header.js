import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CgMenuMotion } from 'react-icons/cg'

function Header() {
    const user=JSON.parse(localStorage.getItem('sheygram-lite-user'))
    const location = useLocation()
    const [showMenu, setShowMenu] = useState(false)
    const navigate=useNavigate()
    // console.log(location)
    const menuItems = [
        {
            title: "Home",
            path: "/"
        },
        {
            title: "Add Post",
            path: "/addpost"
        }
        ,
        {
            title: "Shares",
            path: "/shares"
        }
        ,
        {
            title: "Profile",
            path: `/profile/${user.id}`
        }
    ]
    return (
        <div className='p-5 bg-primary'>
            {!showMenu && (
                <div className='md:flex justify-end mr-2 mt-2 hidden bg-primary'>
                    <CgMenuMotion size={30} color='white' className='cursor-pointer' onClick={() => { setShowMenu(true) }} />

                </div>


            )}
            <div className='flex justify start cursor-pointer' >
                <div>
                <h1 className='text-2xl font-semibold text-white'>SHEYGRAM</h1>
                <h1 className='text-gray-400'>{user.email.substring(0,user.email.length-10)}</h1>

                </div>
            

            </div>
            
            <div className='flex justify-end space-x-10 md:hidden' >
                {menuItems.map((item) => {
                    return <Link
                        to={`${item.path}`} 
                        className={`text-gray-200 ${location.pathname == item.path && 'bg-white text-black rounded p-2'}`}
                        onClick={()=>{setShowMenu(false)}}>{item.title}</Link>
                })}
                 <h1 
            className='text-gray-200'
            
            onClick={()=>{
                localStorage.removeItem('sheygram-lite-user')
                navigate('/login')
            }}>Log Out</h1>

            </div>
            {showMenu && (<div className='md:flex justify-end space-x-10 hidden'  >
                {menuItems.map((item) => {
                    return <Link to={`${item.path}`} className={`text-gray-200 ${location.pathname == item.path && 'bg-white text-black rounded p-2'}`}>{item.title}</Link>
                })}

<h1 
            className='text-gray-200'
            
            onClick={()=>{
                localStorage.removeItem('sheygram-lite-user')
                navigate('/login')
            }}>Log Out</h1>

            </div>)}
           

        </div>
    )
}

export default Header