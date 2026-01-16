import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

function NavigationBar () {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='/'>
          Cash Box App Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/'>
              Home
            </Nav.Link>
            <Nav.Link href='/store'>
              App Store
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar

