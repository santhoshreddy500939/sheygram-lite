
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home'
import Register from './Pages/Register';
import SharePost from './Pages/SharePost';
import Login from './Pages/Login';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AddPost from './Pages/AddPost';
import PostDesc from './Pages/PostDesc';
import Shares from './Pages/Shares';
import Profile from './Pages/Profile'


function App() {

  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/addpost' element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
          <Route path='/shares' element={<ProtectedRoute><Shares /></ProtectedRoute>} />
          <Route path='/sharepost/:id' element={<ProtectedRoute><SharePost/></ProtectedRoute>} />
          <Route path='/post/:id' element={<ProtectedRoute><PostDesc /></ProtectedRoute>} />
          <Route path='/profile/:id' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}
function ProtectedRoute({children}){

    if(localStorage.getItem('sheygram-lite-user'))
    {
      return children
    }
    else
    {
      return <Navigate to='/login'></Navigate>
    }

}


export default App;
