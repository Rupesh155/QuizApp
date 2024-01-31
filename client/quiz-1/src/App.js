import React from 'react'
import AdminPanel from './AdminPanel'
import SignUpForm from './SignUp'
import LoginForm from './Login'
import { Routes, Route } from "react-router-dom";
import HomePage from './Home';
const App = () => {
  return (
    <div>
  
   <Routes>  
      {/* <SignUpForm/>
      <LoginForm/> */}
     
      <Route    path='/' element={<HomePage/>}/>
      <Route    path='/signup' element={<SignUpForm/>}/>
      <Route    path='/login' element={<LoginForm/>}/>
      <Route    path='/admin' element={<AdminPanel/>}/>
      </Routes>
      {/* <AdminPanel/> */}
    </div>
  )
}

export default App