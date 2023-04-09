import React, { useEffect, useState } from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import Loader from "../components/Loader";
import Notification from "../components/Notification";

// we no longer want to use products here, as we are fetching data from the backend:
// import products from '../products'
import Product from "../components/Product";
import MainCarousel from "../components/MainCarousel";

// for dispatching the action
import { getProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_RESET,
  OFFER_CREATE_RESET,
  USER_LOGIN_RESET,
  USER_REGISTER_RESET,
  REVIEW_CREATE_RESET
} from "../constants/constants";

import { useSearchParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

function Home() {
  // initial state of products is set to an empty array
  // const [products, setProducts] = useState([])
  // dispatch is a function that allows us to dispatch an action to the reducer
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  let { error, loading, products } = productList;

  const Pdelete = useSelector((state) => state.productDelete);
  const productCreate = useSelector((state) => state.productCreate);
  const uLogin = useSelector((state) => state.userLogin);
  const uRegister = useSelector((state) => state.userRegister);
  const offerCreate = useSelector((state) => state.offerCreate);
  const createReview = useSelector((state) => state.createReview);

  const [searchParams] = useSearchParams();
  let keyword = searchParams.get("keyword") || "";
  let tags = searchParams.get("tags") || "";

  const [activeSortBy, setActiveSortBy] = useState("Most Recent");
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    if (productCreate && productCreate.success) {
      console.log("yay");
    }
  }, [productCreate]);
  // useEffect is a hook that allows us to run a function when the component loads
  useEffect(() => {
    // console.log(keyword)
    // console.log(tags);
    dispatch(getProducts(keyword, tags));
    if (uLogin.logout == true) {
      toast.dark("Bye 👋, Successfully Logged Out!");
      dispatch({ type: USER_LOGIN_RESET });
    }

    if (uRegister.success == true) {
      toast.dark("✅ Success! Welcome Aboard!");
      dispatch({ type: USER_REGISTER_RESET });
    }

    if (Pdelete.done == true) {
      dispatch(getProducts());
      toast.success("Listing deleted!");
      dispatch({ type: PRODUCT_DELETE_RESET });
    }

    if (productCreate.success == true) {
      console.log("works");
      toast.success("Listing created!");
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
    if (createReview.success == true){
      toast.success('Review Submitted!');
      dispatch({ type: REVIEW_CREATE_RESET })
    }
  
    if (offerCreate.success == true) {
      toast.success("Offer created!");
      dispatch({ type: OFFER_CREATE_RESET });
    }
  }, [
    dispatch,
    keyword,
    tags,
    Pdelete.done,
    productCreate,
    offerCreate.success,
    uRegister.success,
    uLogin.logout,
  ]);

  useEffect(() => {
    if (products && products.length > 0) {
      let sorted = [];
      if (activeSortBy === "Most Recent") {
        sorted = [...products].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      } else if (activeSortBy === "Oldest") {
        sorted = [...products].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      } else if (activeSortBy === "Highest Price") {
        sorted = [...products].sort((a, b) => b.price - a.price);
      } else if (activeSortBy === "Lowest Price") {
        sorted = [...products].sort((a, b) => a.price - b.price);
      }
      setSortedProducts(sorted);
    }
  }, [products, activeSortBy]);

  const handleSortBy = (sortBy) => {
    setActiveSortBy(sortBy);
  };

  // now we can check the attributes, loading, error otherwise render
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {!keyword && !tags && <MainCarousel />}
      <h1 style={{ marginTop: "20px" }}>All Listings</h1>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="primary">
            Sort By: {activeSortBy}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Header>Time</Dropdown.Header>
            <Dropdown.Item onClick={() => handleSortBy("Most Recent")}>
              Newest Date
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortBy("Oldest")}>
              Oldest Date
            </Dropdown.Item>
            <Dropdown.Header>Offered Price</Dropdown.Header>
            <Dropdown.Item onClick={() => handleSortBy("Highest Price")}>
              Highest Price
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleSortBy("Lowest Price")}>
              Lowest Price
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <br></br>
        {loading ? (
          <Loader />
        ) : error ? (
          
          <Notification variant="danger" message={"There are no listings on the site. ("+error +")"} />
        ) : products.length === 0 ? (
          <Alert variant="danger" style={{ marginTop: "25px" }}>
            No results found.
          </Alert>
        ) : (
          <Row>
            {sortedProducts.map((product) => (
              <Col key={product._id} sm={12} md={8} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default Home;
