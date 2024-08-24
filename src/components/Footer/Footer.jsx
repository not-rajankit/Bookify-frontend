import React from 'react'
import './Footer.css'
import { Container,Row,Col,ListGroupItem,ListGroup } from 'reactstrap'
import { Link } from 'react-router-dom'

import logo1 from '../../assets/images/logo1.png'


const nav_links=[
  {
    path:'/home',
    display:'Home'
  },
  {
    path:'/about',
    display:'About',
  },
  {
    path:'/books',
    display:'Books'
  }
]

const quick_links=[
  {
    path:'/login',
    display:'Login',
  },
  {
    path:'/register',
    display:'Register'
  }
]



const Footer = () => {

  const year=new Date().getFullYear()

  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='4'>
            <div className='logo'>
              <img src={logo1}/>
              <div className='social-links d-flex align-items-center gap-4'>
                  <span><Link to='#'><i className="ri-youtube-line"></i></Link></span>
                  <span><Link to='#'><i className="ri-github-fill"></i></Link></span>
                  <span><Link to='#'><i className="ri-instagram-line"></i></Link></span>
                  <span><Link to='#'><i className="ri-facebook-box-fill"></i></Link></span>

              </div>
            </div>
          </Col>

          <Col lg='4'>
            <h5 className='discover'>Discover</h5>
            <ListGroup className='footer-quick-links'>
              {
                nav_links.map((link,idx)=><ListGroupItem className=' underline ps-0 border-0 py-1'  key={idx}><Link to={link.path}>{link.display}</Link></ListGroupItem>)
              }
            </ListGroup>
          </Col>

          <Col lg='4'>
          <h5 className='quickLinks'>Quick Links</h5>
            <ListGroup className='footer-quick-links'>
              {
                quick_links.map((link,idx)=><ListGroupItem className='underline ps-0 border-0 py-1'  key={idx}><Link to={link.path}>{link.display}</Link></ListGroupItem>)
              }
            </ListGroup>
          </Col>

          

          <Col lg='12' className='text-center pt-5 mt-2'>
            <p className='copyright'>&#169; {year}. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
