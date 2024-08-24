import React, { useContext, useEffect, useRef, useState } from 'react'
import '../styles/bookDetails.css'
import { Button, Col, Container, Form, ListGroup, Row } from 'reactstrap'
import { useNavigate, useParams } from 'react-router-dom'



import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { AuthContext } from '../context/AuthContext'
import Spinner from '../shared/Spinner/Spinner'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard'
import { jsPDF } from "jspdf";

 



const BookDetails = () => {

  const handleClick = () => { 
    document.getElementById('popup1').classList.add('tmp')
  }


  const { id } = useParams();

  const reviewMsgRef = useRef('')
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  if (!user || user === undefined || user === null) {
    navigate('/login')
  }


  const { data: book, loading, error } = useFetch(`${BASE_URL}/books/${id}`)
  const { data: bookIssued } = useFetch(`${BASE_URL}/booking/${user?._id}/${id}`)

  const [issued, setIssued] = useState([])
  const [avl, setAvl] = useState(0)

  useEffect(() => {
    setIssued(bookIssued)
  }, [bookIssued])

  useEffect(() => {
    setAvl(book.available)
  }, [book])








  const options = { day: "numeric", month: "long", year: "numeric" }

  // submit request to the server
  const submitHandler = async e => {
    e.preventDefault();






    if (!user || user === undefined || user === null) {
      return toast.error('Please sign in', {
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

    const bookingObj = {
      userId: user._id,
      bookId: book._id
    }

    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(bookingObj)
      })

      const result = await res.json()
      if (!res.ok) {
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
      else {
        toast.success('Book borrowed successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        setTimeout(() => {
          window.location.reload()
        }, 350);
      }

    } catch (err) {
      alert(err.message)
    }


  }



  function dateToYMD(dtt) {
    var date = new Date(dtt);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();

    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }

    return dt + '-' + month + '-' + year;
  }

  const currDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '-' + mm + '-' + yyyy;
    return formattedToday
  }




  const returnHandler = async (e) => {
    e.preventDefault();

    const returnObj = {
      userId: user._id,
      bookId: book._id
    }

    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        method: 'delete',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(returnObj)
      })

      const result = await res.json()
      if (!res.ok) {
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
      else {
        setIssued([])
        setAvl(avl + 1)

        var curDate = new Date().getTime()
        var fine = 0


        var deletedBooking = result.data
        var returnDate = deletedBooking.returnDate
        var title = deletedBooking.bookId.title
        var bookingDate = deletedBooking.borrowedAt
        var returnDateMilli = new Date(returnDate).getTime()
        var days = 0
        if (curDate > returnDateMilli) {
          days = Math.floor((curDate - returnDateMilli) / 86400000)
          fine = days * 10
        }

        const invoiceDetails = `\t\t\t\t\t\t\tBOOKIFY\n\n\n\t\t\t\t\t\t     Invoice Details\n\n\nBorrower's username : ${user.username}\n\nBook Title : ${title}\n\nBooked on : ${dateToYMD(bookingDate)}\n\nExpected return date : ${dateToYMD(returnDate)}\n\nReturned on : ${currDate()}\n\nDays delayed : ${days}\n\nFine : ${fine}`


        const doc = new jsPDF();

        doc.text(invoiceDetails, 10, 10);
        doc.save("invoice.pdf");



        toast.success('Book returned successfully!\n Please check invoice details', {
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

    } catch (err) {
      alert(err.message)
    }
  }


  const deleteBook = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/booking/getBookingByBookId/${id}`)
    const result = await res.json()
    if (!res.ok) {
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
    if (result.size) {
      return toast.error("Can't delete a borrowed book!", {
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

    try {
      const res = await fetch(`${BASE_URL}/books/${id}`, {
        method: 'delete',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
      })

      const result = await res.json()
      if (!res.ok) {
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
      else {
        toast.success('Book deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
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
      }

    } catch (err) {
      alert(err.message)
    }






  }





  return (
    <>
      <section>
        {loading && <h4 className='text-center pt-5'>{loading && <Spinner />}</h4>}
        {error && <h4 className='text-center pt-5'>{error}</h4>}
        <ToastContainer />
        <Container>
          {
            !loading && !error && (
              <Row className='d-flex align-items-center justify-content-between gap-2'>
                
                <Col lg='3'>
                  <div className='imgBox1'>
                    <img src={book.photo} alt='Img not available' />
                  </div>
                </Col>
                <Col lg='4' className='mj p-3'>
                  <div className='book-info'>
                    <h2 className='mb-5 fw-bold'>{book.title}</h2>
                    <div className='book-extra-details'>
                        Author : {book.author}
                    </div>

                    <div className='book-extra-details'>
                        ISBN : {book.isbn}
                    </div>

                    <div className='book-extra-details'>
                        Available : {avl}
                    </div>
                    
                    <div className='book-extra-details'>
                        Rack Number : {book.rack}
                    </div>

                    
                  </div>
                  <div className='d-flex align-items-center justify-content-center gap-2'>
                    {issued.length ? <Button className='primary_btn' onClick={returnHandler}>Return Book</Button> : <Button className='primary_btn' onClick={submitHandler}>Borrow Book</Button>}
                    {(user.role == 'admin') && <Button className='primary_btn' onClick={handleClick}>Update book</Button>}
                    {user.role == 'admin' && <Button className='primary_btn' onClick={deleteBook}>Delete book</Button>}
                  </div>


                </Col>
                <Col lg='3' className='p-3 mj'>
                  <h5 className='fw-bold text-center desc'>Description</h5>
                  <div className=''>
                    {book.description}
                  </div>
                </Col>

                <AdminDashboard method='put' imgSrc={book.photo} bookId={id} type='Update' />


              </Row>

            )
          }
        </Container>
      </section>
    </>
  )
}

export default BookDetails
