import React, { useContext, useState } from 'react'
import '../styles/login.css'
import { Button, Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'

import loginImg from '../assets/images/login.png'
import userIcon from '..//assets/images/user.png'

import { AuthContext } from '../context/AuthContext'
import { BASE_URL } from '../utils/config'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {

  const [credentials,setCredentials]=useState({
    username:undefined,
    password:undefined
})
 
const {dispatch}=useContext(AuthContext)
const navigate=useNavigate()

const handleChange = e => {
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
};

const handleClick=async e=>{
  e.preventDefault();

  dispatch({type:"LOGIN_START"})


  try {

    const res=await fetch(`${BASE_URL}/auth/login`,{
      method:'post',
      headers:{
        'content-type':'application/json'
      },
      credentials:'include',
      body:JSON.stringify(credentials)
    })

    const result=await res.json()
    
    if(!res.ok){
      return toast.error(result.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
  
    }

    dispatch({type:"LOGIN_SUCCESS", payload:result.data}) 
    toast.success(result.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    
      setTimeout(() => {
        navigate('/')
      }, 1500);




  } catch (err) {
    dispatch({type:"LOGIN_FAILURE", payload:err.message})
  }
}


  return (
    <section className='login-section'>
<ToastContainer />

      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='login-container d-flex justify-content-between align-items-center'>
              <div className='login-img'>
                <img src={loginImg} />
              </div>

              <div className='login-form'>
                <div className='user'>
                  <img src={userIcon} />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                <FormGroup>
                    <input type='text' placeholder='Username' required id='username' onChange={handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <input type='password' placeholder='Password' required id='password' onChange={handleChange}/>
                  </FormGroup>

                  <Button className='btn login-btn secondary_btn auth_btn' type='submit'>Login</Button>
                </Form>
                <p>Don't have an account? <Link to='/register'>Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login
