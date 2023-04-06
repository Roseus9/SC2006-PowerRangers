import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
import { Link } from "react-router-dom";

import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { PRODUCT_EDIT_RESET } from "../constants/constants";
// here we deconstruct the props object, to access match
function ProductScreen() {
  let navigate = useNavigate();
  // useParam is a hook that allows us to access the url parameters
  let { itemId } = useParams();
  const dispatch = useDispatch();
  const item = useSelector((state) => state.productItem);
  const bookmark = useSelector((state) => state.bookmark);
  const edit = useSelector((state) => state.productEdit);
  const { error, loading, product } = item;
  if (edit.success == true) {
    dispatch(getProduct(itemId));
    dispatch({ type: PRODUCT_EDIT_RESET });
    toast.success("Product edited!");
  }
  // useEffect is a hook that allows us to run a function when the component loads
  useEffect(() => {
    dispatch(getProduct(itemId));
    //if (Object.keys(userInfo).length != 0)
    //dispatch(getBookmark(itemId, userInfo._id));
  }, [itemId, dispatch, navigate]);

  const alertClicked = () => {
    navigate("/profile/" + product.username);
  };

  const userRegister = useSelector((state) => state.userLogin);
  let { userInfo = {} } = userRegister;
  function handleBookmarkClick() {
    if (Object.keys(userInfo).length == 0) {
      toast.error("You're not logged in!");
    }
    if (product.seller == userInfo._id)
      toast.error("cannot bookmark your own listing!");
    //todo
    else return;
  }
  // format date
  const dateString = product.createdAt;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString();

  const isCreator = product && product.seller == userInfo._id;
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
      {loading ? (
        <Loader />
      ) : error ? (
        <Notification variant="danger" message={error} />
      ) : (
        <Row>
          <Col md={6} sm={12}>
            {/* must add  fluid to ensure the iamge doesnt pop out of the container */}
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3} sm={12}>
            <ListGroup variant="flushed">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Condition: {product.condition ? "New" : "Used"}
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
              {product.delivery && (
                <div>
                  <ListGroup.Item>Pick Up & Delivery Available!</ListGroup.Item>
                  <ListGroup.Item>
                    Pickup Locations: {product.pickupLocations}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Delivery Notes: {product.notes}
                  </ListGroup.Item>
                </div>
              )}
              {!product.delivery && (
                <div>
                  <ListGroup.Item>Pick Up Available!</ListGroup.Item>
                  <ListGroup.Item>
                    Pickup Locations: {product.pickupLocations}
                  </ListGroup.Item>
                </div>
              )}
              <ListGroup.Item>Tags: {product.tags}</ListGroup.Item>
              <ListGroup.Item>
                Listed Time: {formattedDate}
                {/* Listed Time: {product.createdAt} */}
              </ListGroup.Item>
              <ListGroup.Item action variant="warning" onClick={alertClicked}>
                Sold By: {product.username}
                {/* Listed Time: {product.createdAt} */}
              </ListGroup.Item>
              {/* <ListGroup.Item>
        
                            </ListGroup.Item>    */}
            </ListGroup>
            {!isCreator && (
              <div>
                <Button
                  className="my-3"
                  variant="primary"
                  onClick={handleBookmarkClick}
                >
                  Bookmark
                </Button>

                <Link to={`/offer/product/${product._id}`}>
                  <Button
                    className="my-3"
                    variant="danger"
                    style={{ marginLeft: "10px" }}
                  >
                    Make Offer
                  </Button>
                </Link>
              </div>
            )}
            {isCreator && (
              <div>
                <Link to={`/edit/product/${product._id}`}>
                  <Button className="my-3" variant="primary">
                    Edit Listing
                  </Button>

                  <Button
                    className="my-3"
                    variant="danger"
                    style={{ marginLeft: "10px" }}
                  >
                    Delete Listing
                  </Button>
                </Link>
              </div>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
