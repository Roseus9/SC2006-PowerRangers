import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import Notification from "../components/Notification";

// we no longer want to use products here, as we are fetching data from the backend:
// import products from '../products'
import Product from "../components/Product";

// for dispatching the action
import { getProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_RESET,
} from "../constants/constants";
function Home() {
  // initial state of products is set to an empty array
  // const [products, setProducts] = useState([])
  // dispatch is a function that allows us to dispatch an action to the reducer
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const Pdelete = useSelector((state) => state.productDelete);
  const productCreate = useSelector((state) => state.productCreate);
  console.log(productCreate);
  if (Pdelete.done == true) {
    dispatch({ type: PRODUCT_DELETE_RESET });
    dispatch(getProducts());
    toast.success("Listing deleted!");
  }

  if (productCreate.success == true) {
    toast.success("Listing created!");
  }

  // useEffect is a hook that allows us to run a function when the component loads
  useEffect(() => {
    dispatch(getProducts());
    dispatch({ type: PRODUCT_CREATE_RESET });
  }, [dispatch]);

  // now we can check the attributes, loading, error otherwise render
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1>Trending Items</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Notification variant="danger" message={error} />
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
}

export default Home;
