import React, { useContext } from 'react'
import '../styles/home.css'
import { Container, Row, Col, Button } from 'reactstrap'

import SearchingBar from '../shared/SearchingBar'
import BookList from '../components/Books/BookList'
import Subtitle from '../shared/Subtitle'

const Home = () => {

 
  return (
    <>
      
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <SearchingBar />
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg='12' className='mb-3'>
              <Subtitle title={'Popular Books'} />
            </Col>
            <BookList />
          </Row>
        </Container>
      </section>

    </>
  )
}

export default Home
