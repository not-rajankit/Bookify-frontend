import React, { useRef } from 'react'
import { Conatiner, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import { BASE_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom'
import './SearchingBar.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SearchingBar = () => {

    const titleRef = useRef("")
    const navigate = useNavigate()

    const searchHandler = async (e) => {
        e.preventDefault()
        const title = titleRef.current.value

        if (title === "") {
                return toast.error('Please enter the title!', {
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

        const res = await fetch(`${BASE_URL}/books/search/getBookBySearch?title=${title}`)

        if (!res.ok) {
            return toast.error(res.message, {
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

        const result = await res.json()

        navigate(`/books/search?title=${title}`, { state: result.data })
    }

    return (

        <Col lg='12' className='searchingBar'>
<ToastContainer />

            <Form onSubmit={searchHandler}>
                <Row className='searchForm d-flex '>
                    <Col lg='3' className='d-flex align-items-center justify-content-lg-start mt-0'>
                        <FormGroup className='d-flex gap-2'>
                            <div className='mjj'>
                                <input className='p-1' type='text' placeholder='Search a book' required ref={titleRef} />
                            </div>
                            <div className=''>
                            <Button className="primary_btn searching-btn w-100" type="submit" ><i className="ri-search-line"> </i>Search</Button>
                            </div>
                        </FormGroup>
                    </Col>                    

                </Row>
            </Form>
        </Col>

    )
}

export default SearchingBar
