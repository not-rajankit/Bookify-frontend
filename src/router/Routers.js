import React, { useContext } from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import BookDetails from '../pages/BookDetails'
import Books from '../pages/Books'
import SearchResultList from '../pages/SearchResultList'
import About from '../pages/About'
import { AuthContext } from '../context/AuthContext'
import Dashboard from '../components/Dashboard/Dashboard'


const Routers = () => {
  const { user } = useContext(AuthContext)

  return (
    <Routes>
        <Route path='/' element={<Navigate to='/home'/>}/>
        <Route path='/home' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/books' element={<Books/>} />
        <Route path='/dashboard' element={user?<Dashboard id={user._id}/>:<Login/>} />
        <Route path='/books/:id' element={user?<BookDetails/>:<Login/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/books/search' element={<SearchResultList/>} />
    </Routes>
  )
}

export default Routers
