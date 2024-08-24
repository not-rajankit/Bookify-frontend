import React, { useContext, useRef } from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './Header.css'
import { AuthContext } from '../../context/AuthContext'


const nav_links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/books',
    display: 'Books'
  },
  {
    path: '/dashboard',
    display: 'Dashboard'
  }
]


const Header = () => {

  const headerRef = useRef(null)
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const { user, dispatch } = useContext(AuthContext)

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  // const toggleMenu=()=> menuRef.current.classList.toggle('show_menu')
  const toggleMenu=()=>menuRef.current.classList.toggle('show_menu')

  return (
    <>
<header className='header ' ref={headerRef}>
    
    <Container>
      <Row>

        <div className="main-nav d-flex align-items-center justify-content-between">
          <div  className='logo'>
            <img src={logo} />
          </div>

          <div className="navigation px-5">
            <ul className="menu d-flex align-items-center gap-5" >
              {
                
                nav_links.map((item,index)=>(
                  <li className="nav_item" key={index}>
                    <NavLink to={item.path} 
                              className={navClass=>navClass.isActive?"active_link":""}
                        >{item.display}</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className="nav_right d-flex align-items-center ">
            <div className="nav_btns d-flex align-items-center gap-1">
            {
              user ? <>
                <h5 className='mb-0'>{user.username}</h5>
                <Button className='side-btn logout-btn' onClick={logout}>Logout</Button>
              </> : <>
                <Button className='secondary_btn side-btn'><Link to='login'>Login</Link></Button>
                <Button className='primary_btn side-btn'><Link to='register'>Register</Link></Button>
              </>
            }
            </div>

            <span className="mobile_menu" >
            <i className="ri-menu-line"></i>
            </span>
          </div>

        </div>
        
      </Row>
      
    </Container>

    
  </header>
  <div className="navigation-mobile m-auto mb-2 mt-2">
            <ul className="menu d-flex align-items-center gap-5" >
              {
                nav_links.map((item,index)=>(
                  <li className="nav_item" key={index}>
                    <NavLink to={item.path} 
                              className={navClass=>navClass.isActive?"active_link":""}
                        >{item.display}</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
    </>
    
  )
}

export default Header


{/* <Col lg='3'>
            <div className='logo'>
              <img src={logo} />
            </div>
          </Col>

          <Col lg='6'>
            <div className=' align-items-center justify-content-center'>
              <ul className='menu d-flex align-items-center gap-5 navigation'>
                {nav_links.map((item, index) => <li className='nav_item' key={index}><NavLink to={item.path}>{item.display}</NavLink></li>)}
              </ul>
            </div>
          </Col>

          <Col lg='3'>
            <div className='nav_btn d-flex align-items-center gap-4'>
              {
                user ? <>
                  <h5 className='mb-0'>{user.username}</h5>
                  <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                </> : <>
                  <Button className='secondary_btn'><Link to='login'>Login</Link></Button>
                  <Button className='primary_btn'><Link to='register'>Register</Link></Button>
                </>
              }

            </div>
          </Col> */}



          {/* user ? <>
                  <h5 className='mb-0'>{user.username}</h5>
                  <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                </> : <>
                  <Button className='secondary_btn'><Link to='login'>Login</Link></Button>
                  <Button className='primary_btn'><Link to='register'>Register</Link></Button>
                </>
                {/* <Button className="secondary_btn"><Link to='/login'>Login</Link></Button>
                <Button className="primary_btn"><Link to='/register'>Register</Link></Button> */} 





{/* <Container>
        <Row>

          <div className="nav_wrapper d-flex align-items-center justify-content-between">
            <div className='logo'>
              <img src={logo} />
            </div>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <ul className="menu d-flex align-items-center gap-5" >
                {
                  
                  nav_links.map((item,index)=>(
                    <li className="nav_item" key={index}>
                      <NavLink to={item.path} 
                                className={navClass=>navClass.isActive?"active_link":""}
                          >{item.display}</NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-4">
              {
                user ? <>
                  <h5 className='mb-0'>{user.username}</h5>
                  <Button className='btn btn-dark' onClick={logout}>Logout</Button>
                </> : <>
                  <Button className='secondary_btn'><Link to='login'>Login</Link></Button>
                  <Button className='primary_btn'><Link to='register'>Register</Link></Button>
                </>
              }
              </div>

              <span className="mobile_menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
              </span>
            </div>

          </div>
          
        </Row>
      </Container> */}
