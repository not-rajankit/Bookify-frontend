import React from 'react'
import './BookCard.css'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'


const BookCard = ({ book }) => {
    const src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcaS9b4S6tBKcxyE57UwcC7AgD-Un8iZBT-g&usqp=CAU"


    return ( 
        <div className='book-card d-flex justify-content-center w-100'>
            <Card className='w-100 d-flex justify-content-center align-items-center'> 
                    <div className='imgBox'>
                        <img src={book.photo} alt='Img not available'/>
                       
                    </div>

                <CardBody>
    
                    <h5 className='title text-center'>
                        <Link to={`/books/${book._id}`}>{book.title}</Link>
                    </h5>
                    <h6 className='text-center mb-1'>
                        Author : {book.author}
                    </h6>
                    <h6 className=' text-center mb-3'>
                        Available : {book.available}
                    </h6>
                    <div className='card-bottom d-flex justify-content-center'>
                        {/* <h5 className='my-auto'>Available - {book.available}</h5> */}
                        <button className='booking-button'><Link to={`/books/${book._id}`}>Book Details</Link></button>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default BookCard
