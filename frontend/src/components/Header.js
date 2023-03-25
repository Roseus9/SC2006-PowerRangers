import React from 'react'
import { Image, Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import shop from '../resources/shop.svg';
import SearchBar from './SearchBar';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../actions/userLoginActions'

function Header() {
    const userLogin = useSelector(state => state.userLogin);
    const { loading, userInfo, error } = userLogin;

    const dispatch = useDispatch();

    // to dispatch the action we created for USER_LOGOUT
    const logoutHandler = () => {
        dispatch(logout());
        console.log('logged out');
    }

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
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>

                        {userInfo ? (
                            <NavDropdown title={userInfo.username} id="username">
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                            </NavDropdown>
                            ) : (
                            <LinkContainer to='/login'>
                                <Nav.Link>Login <i className="fa-solid fa-right-to-bracket"></i></Nav.Link>
                            </LinkContainer>
                        )}

                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    </header>
    )
}

export default Header