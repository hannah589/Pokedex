import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DarkModeBtn from './DarkModeBtn';

function Header() {
  return (
    <>
       <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          {/*link to home page*/}
          <Navbar.Brand as={Link} to="/"><img src='https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png' alt='Pokemon Logo' style={{ width: '100px'}}></img></Navbar.Brand>
          <Nav className="me-auto">
            {/*link to home page*/}
            <Nav.Link as={Link} to="/" style={{ fontSize: '18px'}} href="#home">Home</Nav.Link>
            {/*link to home page */}
            <Nav.Link as={Link} to="/pokedex" style={{ fontSize: '18px'}}>Pokédex</Nav.Link>
            {/*link to pokemon details page */}
          </Nav>
          <DarkModeBtn />
        </Container>
      </Navbar>
    </>
  )
}

export default Header
