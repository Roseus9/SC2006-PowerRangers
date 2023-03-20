import React from 'react'
import { Image, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import SearchBar from './SearchBar';
import shop from '../resources/shop.svg';

function Header() {
  return (
    <header>
        <Navbar bg="light" expand="lg" collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                            <Image src={shop} height="30" className="d-inline-block align-top" style={{ marginRight: '5px' }}/>
                            NTU Marketplace
                    </Navbar.Brand>
                </LinkContainer>
                <SearchBar/>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <LinkContainer to='/catalogue'>
                            <Nav.Link>Catalogue</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to='/login'>
                            <Nav.Link>Login <i className="fa-solid fa-right-to-bracket"></i></Nav.Link>
                        </LinkContainer>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <LinkContainer to ='/createListing'>
                            <Nav.Link>Create Listing</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    </header>
  )
}

export default Header