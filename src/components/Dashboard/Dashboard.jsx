import React, { useContext } from 'react'
import { Button, Col, Container, Row, Spinner } from 'reactstrap'
import { AuthContext } from '../../context/AuthContext'
import { BASE_URL } from '../../utils/config'
import useFetch from '../../hooks/useFetch'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import Subtitle1 from '../../shared/Subtitle1'
import { ToastContainer, toast } from 'react-toastify'
import AdminDashboard from '../AdminDashboard/AdminDashboard'
import jsPDF from 'jspdf'


const Dashboard = (props) => {
  const { user } = useContext(AuthContext)
  const { data: bookings, loading, error } = useFetch(`${BASE_URL}/booking/${props.id}`)

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
    e.preventDefault()
    const returnObj = {
      userId: props.id,
      bookId: e.target.id
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

        toast.success('Book returned successfully! \nPlease check invoice details', {
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
        }, 1000);
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
  const date = new Date().getTime()

  const checkReturn = (dt) => {
    const returnDt = new Date(dt).getTime()

    if (returnDt > date) return false;
    return true;
  }
  const handleClick=()=>{
    document.getElementById('popup1').classList.add('tmp') 
  }

  return (
    <div>
      <ToastContainer />
      <Container>
        <Row>
          <Col>
            {loading && <h4 className='text-center pt-5 '>{loading && <Spinner />}</h4>}

            {error && <h4 className='text-center pt-5'>{error}</h4>}

            {!loading && !error && <div className='main-box'>

              <div className='admin-section'>
                <div className='inner-box'>
                  {(user && user.role == 'admin') && <Button className='primary_btn add-btn' onClick={handleClick}>Add a book</Button>}

                  <AdminDashboard method='post' imgSrc="" bookId='' type='Add' />
                </div>
              </div>
              <div className='borrows'>
              <h3 className='my-5 text-center bold'><Subtitle1 title={"Books Borrowed"} /></h3>
              {
                (bookings && bookings.length) ?
                  <>
                    <div className="headingg">
                      <div>Title</div>
                      <div>Return Date</div>
                      <div></div>
                    </div>
                    {bookings.map((booking, idx) => <div className='dash-item'>
                      <div>{booking.bookId.title}</div>
                      <div className='d-flex mjmj'><span>{checkReturn(booking.returnDate) && <span className='overdue'>OVERDUE</span>}</span><span>{dateToYMD(booking.returnDate)}</span></div>
                      <div className='btnn'><Button className='primary_btn me-2'><Link className='detail-btn' to={`/books/${booking.bookId._id}`}>Book Details</Link></Button><Button onClick={returnHandler} id={booking.bookId._id} className='primary_btn'>Return</Button></div>

                    </div>)
                    }
                  </>

                  : <h3 className='text-center'>No book borrowed!</h3>
              }
              </div>

              
            </div>}

          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard
