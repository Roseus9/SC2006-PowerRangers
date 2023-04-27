import { React, useEffect, useState } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  useSearchParams,
} from "react-router-dom";

import Loader from "../components/Loader";
import Notification from "../components/Notification";
import Product2 from "../components/Product2";
import Alert from "react-bootstrap/Alert";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileView } from "../actions/userLoginActions";
import { USER_UPDATE_RESET } from "../constants/constants";
import { getReviewAction } from "../actions/offerActions";

import Rating from "../components/Rating";

function ProfileScreen() {
  let { username } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, userObj } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);
  const userLogin = useSelector((state) => state.userLogin);
  let { userInfo } = userLogin;

  if (userUpdate.success == true) {
    dispatch(getUserProfileView(username));
    dispatch({ type: USER_UPDATE_RESET });
    toast.success("Profile Edited!");
  }
  const getReviews = useSelector((state) => state.getReview);
  const { review } = getReviews;
  
  let isCreator = false;
  if (userInfo && userObj) {
    isCreator = userInfo && userInfo._id == userObj.user.id;
  }

  // useEffect is a hook that allows us to run a function when the component loads
  useEffect(() => {
    dispatch(getUserProfileView(username));

    // console.log(error)
    // console.log(userDetails)
  }, [username, userDetails.success, dispatch]);

  useEffect(() => {
    if (userObj) {
      dispatch(getReviewAction(userObj.user.id, true));
    }
    console.log("userObj", userObj)
    console.log("userInfo", userInfo)
    console.log("isCreator", isCreator)
    console.log("review", review);
  }, [userObj, userInfo]);



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
      <Row>
        <h2>{username}'s Profile Page</h2>
        <hr />
        <Col md={3}>
          <Card>
            <Card.Header>
              🤗 {userObj ? userObj.user.name : "No Name"}
            </Card.Header>
            <Card.Body>
              <Card.Title> </Card.Title>
              <Card.Text>
                <Image
                  src={
                    userObj
                      ? userObj.profile.profilepic
                        ? userObj.profile.profilepic
                        : "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                      : "https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg"
                  }
                  alt="No Profile Picture Uploaded"
                  fluid
                />
              </Card.Text>
              <br></br>
              <h6>User Details: </h6>
              <ListGroup variant="flush">
                <ListGroup.Item variant="info">
                  <div>Joined: </div>
                  {userObj
                    ? Date(userObj.user.date_joined).toLocaleString()
                    : " - "}
                </ListGroup.Item>
                <ListGroup.Item active>
                  Telegram Handle:
                  <div className="fw-bold">
                    @{userObj ? userObj.profile.telegram : "No Telegram"}
                  </div>
                </ListGroup.Item>
                <ListGroup.Item variant="light">
                  Bio: {userObj ? userObj.profile.bio : "-"}
                </ListGroup.Item>
              </ListGroup>
              {isCreator && (
                <Link to={`/update/profile/${username}`}>
                  <Button className="my-3" variant="primary">
                    Edit Profile ✏️
                  </Button>
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <h4>Listings 📌</h4>
          {loading ? (
            <Loader />
          ) : error ? (
            <Notification
              variant="danger"
              message={"This User has not listed any items."}
            />
          ) : userObj == null ? (
            <Notification variant="danger" message="User not found" />
          ) : (
            <Row>
              {userObj.products.length === 0 ? (
                <Alert variant="danger" className="d-none d-lg-block">
                  No Listings Available
                </Alert>
              ) : (
                userObj.products.map((product) => (
                  <Col key={product._id} sm={12} md={8} lg={4} xl={3}>
                    <Product2 product={product} />
                  </Col>
                ))
              )}
            </Row>
          )}
          <br></br>
          <h4>Reviews 📝</h4>
          {getReviews.loading ? (
            <Loader />
          ) : getReviews.error ? (
            <Notification variant="danger" message={getReviews.error} />
          ) : review &&
            review.buyerReviews.length === 0 &&
            review.sellerReviews.length === 0 ? (
            <Notification variant="danger" message="No Reviews Available" />
          ) : (
            <Row>
              <Alert variant="light">
                <Row>
                  <Col md="auto">
                    <span style={{ display: "inline" }}>
                      Average Ratings (
                      {review && review.raters ? review.raters : "0"})
                    </span>
                    <Rating
                      value={
                        review && review.totalrating
                          ? parseFloat(review.totalrating)
                          : 0
                      }
                    />
                  </Col>
                </Row>
              </Alert>
              <ListGroup as="ol" numbered>
                {review &&
                  review.buyerReviews.map((r) => (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div>
                          <Alert.Link
                            onClick={() => {
                              navigate(`/profile/${r.seller.username}`);
                            }}
                          >
                            {r.seller.username}(seller)
                          </Alert.Link>
                          <strong> {r.product.name}</strong>
                        </div>
                        {r.content}
                      </div>
                      <Badge bg="primary" pill>
                        {r.rating} ⭐
                      </Badge>
                    </ListGroup.Item>
                  ))}
                {review &&
                  review.sellerReviews.map((r) => (
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div>
                          <Alert.Link
                            onClick={() => {
                              navigate(`/profile/${r.buyer.username}`);
                            }}
                          >
                            {r.buyer.username}(buyer)
                          </Alert.Link>
                          <strong> {r.product.name}</strong>
                        </div>
                        {r.content}
                      </div>
                      <Badge bg="primary" pill>
                        {r.rating} ⭐
                      </Badge>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default ProfileScreen;
