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

import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileView } from "../actions/userLoginActions";
import { USER_UPDATE_RESET } from "../constants/constants";

function ProfileScreen() {
  let { username } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, userObj } = userDetails;
  const userUpdate = useSelector((state) => state.userUpdate);

  if (userUpdate.success == true) {
    dispatch(getUserProfileView(username));
    dispatch({ type: USER_UPDATE_RESET });
    toast.success("Profile Edited!");
  }

  // useEffect is a hook that allows us to run a function when the component loads
  useEffect(() => {
    dispatch(getUserProfileView(username));
  }, [username, dispatch, navigate]);

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
              <Link to={`/update/profile/${username}`}>
                <Button className="my-3" variant="primary">
                  Edit Profile ✏️
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <h4>Listings 📌</h4>
          {loading ? (
            <Loader />
          ) : error ? (
            <Notification variant="danger" message={error} />
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
        </Col>
      </Row>
    </div>
  );
}

export default ProfileScreen;
