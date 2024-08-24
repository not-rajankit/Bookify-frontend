import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'


const AdminDashboard = (props) => {
    const { user } = useContext(AuthContext)
    const navigate=useNavigate()

    const [bookDetails, setBookDetails] = useState({
        title:"",
        isbn:"",
        author:"",
        available:0,
        photo:"",
        rack:"",
        description:""

    })

    const handleOnChange = e => {
        setBookDetails(prev => ({ ...prev, [e.target.id]: e.target.value }))
    };

    const handleClick=async(e)=>{
        e.preventDefault();
        try {

            if (!user || user === undefined || user === null) {
                toast.error('Please sign in', {
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
                    navigate('/login')
                }, 1500);


            }
            else {
                if(bookDetails.photo===""){
                    bookDetails.photo=(props.imgSrc==""?"https://img.freepik.com/free-photo/red-hardcover-book-front-cover_1101-833.jpg?w=2000":props.imgSrc)
                }
                if(bookDetails.description===""){
                    bookDetails.description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum optio cupiditate ut voluptates eveniet ducimus quos doloremque dicta fugiat Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias expedita maiores, corrupti quas debitis repellat itaque autem provident ipsam obcaecati consequuntur consectetur odio similique officiis voluptate excepturi officia sequi praesentium dignissimos libero? Necessitatibus, vero, dolores repellat cupiditate illum quas consequatur magni ratione, nulla sit laboriosam alias esse dolorem maiores rerum."
                }
                const res = await fetch(`${BASE_URL}/books/${props.bookId}`, {
                    method: props.method,
                    headers: {
                        'content-type': 'application/json' 
                    },
                    credentials: 'include',
                    body: JSON.stringify(bookDetails)
                })

                const result = await res.json()
                if (!res.ok) {
                    return toast.error(result.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }
                else {
                    setTimeout(() => {
                        window.location.reload()
                      }, 350);
                    return toast.success(result.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }

            }

        } catch (err) {
            return toast.error(err.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        
    }

    const handleClose=()=>{
        document.getElementById('popup1').classList.remove('tmp') 
    }

  return (
    <div id="popup1" className="overlayy">
  <div className="popupp"> 
    <a className="closee" onClick={handleClose}>
      x
    </a>
    <div className="contentt">
    <div>
      <Container className='mt-5'>
        <Row>
            <Col>
        
            <div className='book-form w-100  mx-auto'>
                <h5 className='text-center'>Book Details</h5>
                <Form className='book-info' onSubmit={handleClick}>
                    <FormGroup>
                        <input className='w-100' type='text' placeholder='Title*' id='title' onChange={handleOnChange} required />
                    </FormGroup>
                    <FormGroup>
                        <input className='w-100' type='text' placeholder='Author*' id='author' required onChange={handleOnChange} />
                    </FormGroup>
                    <FormGroup>
                        <input className='w-100' type='text' placeholder='ISBN*' id='isbn' required onChange={handleOnChange} />
                    </FormGroup>
                    <FormGroup>
                        <input className='w-100' type='text' placeholder='Rack No.*' id='rack' required onChange={handleOnChange} />
                    </FormGroup>
                    <FormGroup>
                        <input className='w-100' type='number' placeholder='Books Available*' id='available' required onChange={handleOnChange} />
                    </FormGroup>
                    <FormGroup>
                        <input className='w-100' type='text' placeholder='Image url' id='photo' onChange={handleOnChange} />
                    </FormGroup>
                    <FormGroup>
                        <input className='w-100' type='text' placeholder='Description' id='description' onChange={handleOnChange} />
                    </FormGroup>
                    <div className='booking-bottom mt-4 d-flex align-items-center justify-content-center'>
                        <Button className='btn primary_btn w-50 mt-2 mx-auto'>{props.type} Book</Button>
                    </div>

                </Form>
            </div>


            </Col>
        </Row>
      </Container>
    </div>
    </div>
  </div>
</div>

    
  )
}

export default AdminDashboard
