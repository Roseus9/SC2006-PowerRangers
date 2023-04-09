import React, { useEffect } from "react";
import { useState } from "react";
import { Image, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import shop from "../resources/shop.svg";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfileView, logout } from "../actions/userLoginActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  // to dispatch the action we created for USER_LOGOUT
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
    console.log("logged out");
  };
  useEffect(() => {
    console.log(userInfo, "userInfo");
    const fetch = async () => {
      const { data } = await axios.get(`/api/userinfo/${userInfo._id}`);
      setUsername(data.username);
    };
    fetch();
  });
  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <Image
                src={shop}
                height="30"
                className="d-inline-block align-top"
                style={{ marginRight: "5px" }}
              />
              NTU Marketplace
            </Navbar.Brand>
          </LinkContainer>
          <SearchBar />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              {userInfo ? (
                <NavDropdown title={userInfo.username} id="username">
                  <LinkContainer to={`profile/${userInfo.username}`}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/create">
                    <NavDropdown.Item>Create Listing</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/bookmarked">
                    <NavDropdown.Item>Bookmarked Listings</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`offers/${userInfo.username}`}>
                    <NavDropdown.Item>Offers</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/settings">
                    <NavDropdown.Item>Settings</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    Login <i className="fa-solid fa-right-to-bracket"></i>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
