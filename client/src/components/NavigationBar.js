import React, { useContext } from 'react'
import { UserContext } from '../components/UserContext'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

function NavigationBar() {
  const { user, setUser } = useContext(UserContext)

  console.log(user)
  return (
    <Navbar className='p-3 mb-2 bg-light text-dark'>
      <Container>
        <Navbar.Brand href='/'>
          <img
            alt='logo'
            src='https://preview.redd.it/b3gdd05i8tr31.png?width=960&crop=smart&auto=webp&v=enabled&s=47492ea759d6a08ae8714551734f2a26e46fa493'
            width='30'
            height='30'
          />{' '}
          SoundScape
        </Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link href='/dashboard'>Playlists</Nav.Link>
          <Nav.Link href='/new'>Create Playlist</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Nav className='me-auto'>
          <NavDropdown title='Debug' id='basic-nav-dropdown'>
            <NavDropdown.Item href='/allusers'>Show All Users</NavDropdown.Item>
            <NavDropdown.Item href='/connect'>API Connect</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {user?.loggedIn ? (
          <Nav className='justify-content-end'>
            <NavDropdown
              title={
                <div className='d-inline'>
                  {/* <FontAwesomeIcon icon='fa-solid fa-user' /> */}
                  Welcome {user.email}!
                </div>
              }
            >
              {/* <NavDropdown.Item href='/edituser'>Edit Profile</NavDropdown.Item> */}
              <NavDropdown.Item href='/logout'>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav className='justify-content-end'>
            <Nav.Link href='/login'>Sign in</Nav.Link>
            <Nav.Link href='/registration'>Register</Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  )
}

export default NavigationBar
