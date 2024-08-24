import React, { useEffect, useState } from 'react'
import CommonSection from '../shared/CommonSection'
import '../styles/book.css'
import BookCard from '../components/Books/BookCard'
import SearchingBar from '../shared/SearchingBar'
import { Container,Row,Col } from 'reactstrap'

import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import Spinner from '../shared/Spinner/Spinner'


const Books = () => {
  const [pageCount,setPageCount]=useState(0);
  const [page,setPage]=useState(0);


  const {data:books,loading,error}=useFetch(`${BASE_URL}/books?page=${page}`)
  const {data:bookCount}=useFetch(`${BASE_URL}/books/search/getBooksCount`)

  useEffect(()=>{
      const pages=Math.ceil(bookCount/8);
      setPageCount(pages)
      window.scrollTo(0,0)
  },[page,bookCount,books])
  return (
    <>
      <CommonSection title={"All Books"}/>
      <section className='pt-0 pb-1'>
        <Container>
          <Row className='mt-4'>
            <SearchingBar/> 
          </Row>
        </Container>
      </section>

      <section className='pt-5'>
        <Container>
        {loading && <h4 className='text-center pt-5'>{loading && <Spinner/>}</h4>}
        
        {error && <h4 className='text-center pt-5'>{error}</h4>}
          {
            !loading && !error && (
              <Row>
            {books?.map((book,idx)=><Col lg='3' key={book._id}><BookCard book={book}/></Col>)}

            <Col lg='12'>
              <div className='pagination d-flex align-items-center justify-content-center mt-4 gap-3'>
                {
                  [...Array(pageCount).keys()].map(number=>(
                    <span className={page===number?'active_page':''} key={number} onClick={()=>setPage(number)}>{number+1}</span>
                  ))
                }
              </div>
            </Col>
          </Row>
            )
          }
        </Container>
      </section>
    </>
  )
}

export default Books
