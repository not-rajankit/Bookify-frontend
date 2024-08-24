import React from 'react'
import { Col } from 'reactstrap'
import BookCard from './BookCard'

import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'
import Spinner from '../../shared/Spinner/Spinner'




const BookList = () => {

  const { data: popularBooks, loading, error } = useFetch(`${BASE_URL}/books/search/getPopularBooks`)


  return (
    <>
      {loading && <h4 className='text-center pt-5'>{loading && <Spinner />}</h4>}
      {error && <h4 className='text-center pt-5'>{error}</h4>}
      {!loading && !error && popularBooks?.map(book => (<Col lg='3' key={book._id}><BookCard book={book} /></Col>))}
    </>
  )
}

export default BookList
