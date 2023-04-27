import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Badge,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../actions/productActions";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  PRODUCT_EDIT_RESET,
  BOOKMARK_CHANGE_RESET,
  BOOKMARK_INDIV_SEARCH_RESET,
  BOOKMARK_FIND_RESET,
} from "../constants/constants";
import { deleteProduct } from "../actions/productActions";
import {
  changeBookmarkAction,
  findBookmarks,
  getBookmarkAction,
} from "../actions/bookmarkActions";
import { PRODUCT_DELETE_RESET } from "../constants/constants";
import "react-toastify/dist/ReactToastify.css";
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
  const Pdelete = useSelector((state) => state.productDelete);
  const userRegister = useSelector((state) => state.userLogin);
  let { userInfo } = userRegister;
  const getBookmarkState = useSelector((state) => state.getBookmark);
  const [bookmarkText, setBookmarkText] = useState("Bookmark");
  const changeBookmarkState = useSelector((state) => state.changeBookmark);
  const findBookmarkState = useSelector((state) => state.findBookmark);
  const [likes, setLikes] = useState(0);
  if (edit.success == true) {
    dispatch(getProduct(itemId));
    dispatch({ type: PRODUCT_EDIT_RESET });
    toast.success("Product Edited!");
  }
  // useEffect is a hook that allows us to run a function when the component loads
  useEffect(() => {
    dispatch(getProduct(itemId));
    //if (Object.keys(userInfo).length != 0)
    //dispatch(getBookmark(itemId, userInfo._id));
  }, [itemId, navigate]);

  useEffect(() => {
    if (item.done && userInfo) {
      dispatch(findBookmarks(itemId));
      dispatch({ type: BOOKMARK_FIND_RESET });
      dispatch(getBookmarkAction(itemId, userInfo._id));
      dispatch({ type: BOOKMARK_CHANGE_RESET });
    }
  }, [item, changeBookmarkState.done]);

  useEffect(() => {
    if (findBookmarkState.done) {
      setLikes(findBookmarkState.count);
    }
  }, [findBookmarkState.done]);
  useEffect(() => {
    if (changeBookmarkState.done) {
      toast.success(
        changeBookmarkState.newFlag == true
          ? "Bookmarked Listing!"
          : "Bookmark Removed!"
      );
      dispatch({ type: BOOKMARK_INDIV_SEARCH_RESET });
    }
  }, [changeBookmarkState.done]);

  useEffect(() => {
    if (getBookmarkState.done) {
      setBookmarkText(
        getBookmarkState.flag == true ? "Remove Bookmark" : "Bookmark"
      );
    }
  }, [getBookmarkState, changeBookmarkState]);

  const alertClicked = () => {
    navigate("/profile/" + product.username);
  };
  const deleteListing = () => {
    dispatch(deleteProduct(itemId));
    navigate("/");
  };

  const deleteListingToast = () => {
    toast.error(
      <div>
        Are you sure? <br />
        <Button className="my-3" variant="danger" onClick={deleteListing}>
          Yes
        </Button>
        <Button className="my-3" style={{ marginLeft: "10px" }}>
          No
        </Button>
      </div>
    );
  };

  const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleIconClick = () => {
    setShowModal(true);
  };

  function handleBookmarkClick() {
    dispatch({ type: BOOKMARK_CHANGE_RESET });
    if (Object.keys(userInfo).length == 0) {
      toast.error("You're Not Logged In!");
    } else if (product.seller == userInfo._id)
      toast.error("Cannot Bookmark Your Own Listing!");
    //todo
    else {
      dispatch(
        changeBookmarkAction(
          item.product._id,
          userInfo._id,
          getBookmarkState.flag
        )
      );
    }
  }
  // format date
  const dateString = product.createdAt;
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString();

  let isCreator = false;
  if (userInfo) {
    isCreator = product && product.seller == userInfo._id;
  }
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
        theme="dark"
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Notification variant="danger" message={error} />
      ) : (
        <Row>
          <Col md={6} sm={12}>
            <div className="product-image-container">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>View full image</Tooltip>}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                  onClick={handleIconClick}
                  style={{ cursor: "pointer" }}
                />
              </OverlayTrigger>
              <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>{product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Image src={product.image} alt={product.name} fluid />
                </Modal.Body>
              </Modal>
            </div>
          </Col>
          <Col md={3} sm={12}>
            <ListGroup variant="flushed">
              <ListGroup.Item>
                <div className="d-flex align-items-center">
                  <h3>{product.name}</h3>
                  <Badge
                    bg="secondary"
                    className="ms-2"
                    style={{
                      fontSize: "13px",
                      backgroundColor: "#d3d3d3",
                      color: "#000000",
                    }}
                  >
                    {likes} ❤️
                  </Badge>
                </div>

                {!product.delivery && <Badge bg="warning">Pick-Up</Badge>}
                {product.delivery && (
                  <>
                    <Badge bg="warning" style={{ marginRight: "6px" }}>
                      Pick-Up
                    </Badge>
                    <Badge bg="info">Delivery</Badge>
                  </>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price:</strong> ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Description:</strong> {product.description}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Condition:</strong> {product.condition ? "New" : "Used"}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Tags: </strong>
                <em>{product.tags}</em>
              </ListGroup.Item>
              {product.delivery && (
                <div>
                  <ListGroup.Item>
                    <strong>Pick-Up Locations: </strong>
                    {product.pickupLocations}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Delivery Notes: </strong>
                    {product.notes}
                  </ListGroup.Item>
                </div>
              )}
              {!product.delivery && (
                <div>
                  <ListGroup.Item>
                    <strong>Pick-Up Locations:</strong>{" "}
                    {product.pickupLocations}
                  </ListGroup.Item>
                </div>
              )}
              <ListGroup.Item>
                <strong>Listed Time:</strong> {formattedDate}
                {/* Listed Time: {product.createdAt} */}
              </ListGroup.Item>
              <ListGroup.Item action variant="warning" onClick={alertClicked}>
                <strong>Sold By:</strong> {product.username}
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
                  {bookmarkText}
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
                </Link>
                <Button
                  className="my-3"
                  variant="danger"
                  style={{ marginLeft: "10px" }}
                  onClick={deleteListingToast}
                >
                  Delete Listing
                </Button>
              </div>
            )}
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductScreen;
