import React from "react";
import { useEffect } from "react";
import { Image, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import shop from "../resources/shop.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userLoginActions";
import { useNavigate } from "react-router-dom";
import { findUserBookmarks } from "../actions/bookmarkActions";
import { BOOKMARK_FIND_USER_RESET } from "../constants/constants";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
import { Alert } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Product from "../components/Product";
export const Bookmarked = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const userBookmarksState = useSelector((state) => state.findUserBookmark);
  let { loading, error, products, done } = userBookmarksState;
  let { userInfo } = userLogin;
  let { _id = {} } = userInfo;
  useEffect(() => {
    if (!_id) navigate("/");
    console.log(_id);
    dispatch(findUserBookmarks(_id));
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Notification variant="danger" message={error} />
      ) : products.detail ? (
        <Alert variant="danger" style={{ marginTop: "25px" }}>
          No results found.
        </Alert>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={8} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};
