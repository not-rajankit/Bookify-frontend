import React, { useState } from 'react'
import CommonSection from '../shared/CommonSection'
import { Col, Container, Row } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import BookCard from '../components/Books/BookCard'


const SearchResultList = () => {

  const location=useLocation()
  const [data]=useState(location.state)

  return (
    <>
      <CommonSection title={"Search Result"}/>
      <section>
      <Container>
        <Row>
          {data.length===0?(<h4>No results found!</h4>):(data.map(book=>(
            <Col lg='3' className='mb-4' key={book._id}>
              <BookCard book={book}/>
            </Col>
          )))}
        </Row>
        </Container>

      </section>
    </>
  )
}

export default SearchResultList
