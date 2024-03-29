import React, { useState, useEffect, useMemo } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Alert from "react-bootstrap/Alert";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";

import { getUserProfileView } from "../actions/userLoginActions";
import {
  getUserReceivedOffers,
  getUserSentOffers,
  getUserBoughtOffers,
  getUserSoldOffers,
} from "../actions/offerActions";

import { useDispatch, useSelector } from "react-redux";
import {
  OFFER_RESPOND_RESET,
  OFFER_COMPLETE_RESET,
  OFFER_DELETE_RESET,
  OFFER_EDIT_RESET,
} from "../constants/constants";
import Notification from "../components/Notification";
import Loader from "../components/Loader";
import MyOffers from "../components/MyOffers";
import SentOffers from "../components/SentOffers";
import BoughtOffers from "../components/BoughtOffers";
import SoldOffers from "../components/SoldOffers";

function OffersScreen() {
  let { username } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, userObj } = userDetails;
  const offerReceived = useSelector((state) => state.offerReceived);
  const { errorR, loadingR, offersR } = offerReceived;
  const offerSent = useSelector((state) => state.offerSent);
  const { errorS, loadingS, offersS } = offerSent;
  const offerBought = useSelector((state) => state.offerBought);
  const { errorB, loadingB, offersB } = offerBought;
  const offerSold = useSelector((state) => state.offerSold);
  const { errorSO, loadingSO, offersSO } = offerSold;

  //user cant access create listing page if not logged in
  const userRegister = useSelector((state) => state.userLogin);
  let { userInfo } = userRegister;

  const respondState = useSelector((state) => state.offerRespond);
  const deleteState = useSelector((state) => state.offerDelete);
  const editOfferState = useSelector((state) => state.offerEdit);
  const completeState = useSelector((state) => state.offerComplete);

  // states for filtering
  // consists of active sort by for time, and price
  // and listing status for accepted, completed, or all
  const [activeSortBy, setActiveSortBy] = useState("newest");
  const [listingStatus, setListingStatus] = useState("all");
  // accepted and completed are individual states for the 2 sliders
  const [accepted, setAccepted] = useState(true);
  const [completed, setCompleted] = useState(true);

  // handlers for sliders
  const handleCompletedChange = (event) => {
    const { name, checked } = event.target;
    if (checked == true) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  };

  const handleAcceptedChange = (event) => {
    const { name, checked } = event.target;
    if (checked == true) {
      setAccepted(true);
    } else {
      setAccepted(false);
    }
  };

  // functions for filtering listings

  let sortByOldest = () => {
    setActiveSortBy("oldest");
  };

  let sortByHighest = () => {
    setActiveSortBy("highest");
  };

  let sortByLowest = () => {
    setActiveSortBy("lowest");
  };

  let sortByNewest = () => {
    setActiveSortBy("newest");
  };
  useEffect(() => {
    if (editOfferState && editOfferState.success) {
      toast.success("Offer edited!");
      dispatch({ type: OFFER_EDIT_RESET });
    }
  });
  // useEffect is a hook that allows us to run a function when the component loads
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (username != userInfo.username) {
      navigate("/");
    }
    

    if (respondState.success) {
      toast.success(respondState.flag ? "Offer Accepted!" : "Offer Deleted!");
      dispatch({ type: OFFER_RESPOND_RESET });
    }

    if (completeState.success) {
      toast.success(
        completeState.flag
          ? "Offer Completed, all other offers for the same product have been declined!"
          : "Offer Deleted!"
      );
      dispatch({ type: OFFER_COMPLETE_RESET });
    }

    if (deleteState.success) {
      toast.success("Offer Deleted!");
      dispatch({ type: OFFER_DELETE_RESET });
    }

    let status = "all";
    if (accepted && completed) {
      status = "all";
    } else if (accepted) {
      status = "accepted";
    } else if (completed) {
      status = "completed";
    } else {
      status = "all";
    }
    console.log("Listing Status:", status);
    console.log("Sort By Time/Price:", activeSortBy);
    setListingStatus(status);

    dispatch(getUserProfileView(username));
    dispatch(getUserReceivedOffers(username + "-" + activeSortBy));
    dispatch(getUserSentOffers(username + "-" + activeSortBy));
    dispatch(getUserBoughtOffers(username + "-" + activeSortBy + "-" + status));
    dispatch(getUserSoldOffers(username + "-" + activeSortBy + "-" + status));
  }, [
    accepted,
    completed,
    activeSortBy,
    respondState.success,
    deleteState.success,
    completeState.success,
    dispatch,
  ]);

  return (
    <div>
      <ToastContainer
        toastId="toastID"
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Tabs
        defaultActiveKey="received"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="received" title="Received Offers">
          <h4>My Received Offers</h4>
          <Dropdown>
            <Dropdown.Toggle variant="dark">
              Sort By: {activeSortBy}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header>Time</Dropdown.Header>
              {/* <Dropdown.Menu as={ButtonGroup} title="Sort By" id="bg-nested-dropdown"> */}
              <Dropdown.Item
                eventKey="1"
                onClick={sortByNewest}
                active={activeSortBy === "newest"}
              >
                Newest Date
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={sortByOldest}
                active={activeSortBy === "oldest"}
              >
                Oldest Date
              </Dropdown.Item>
              <Dropdown.Header>Offered Price</Dropdown.Header>
              <Dropdown.Item
                eventKey="3"
                onClick={sortByHighest}
                active={activeSortBy === "highest"}
              >
                Highest Price
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="4"
                onClick={sortByLowest}
                active={activeSortBy === "lowest"}
              >
                Lowest Price
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br></br>
          {loadingR | completeState.loading ? (
            <Loader />
          ) : errorR ? (
            <Notification variant="danger" message={errorR} />
          ) : offersR == null ? (
            <Notification variant="danger" message="No such offers available" />
          ) : (
            <Row>
              {offersR.offers.length === 0 ? (
                <Alert variant="danger" className="d-none d-lg-block">
                  No such offers available
                </Alert>
              ) : (
                <MyOffers offers={offersR.offers} />
              )}
            </Row>
          )}
        </Tab>
        <Tab eventKey="sent" title="Sent Offers">
          <h4>My Sent Offers</h4>
          <Dropdown>
            <Dropdown.Toggle variant="dark">
              Sort By: {activeSortBy}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header>Time</Dropdown.Header>
              {/* <Dropdown.Menu as={ButtonGroup} title="Sort By" id="bg-nested-dropdown"> */}
              <Dropdown.Item
                eventKey="1"
                onClick={sortByNewest}
                active={activeSortBy === "newest"}
              >
                Newest Date
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={sortByOldest}
                active={activeSortBy === "oldest"}
              >
                Oldest Date
              </Dropdown.Item>
              <Dropdown.Header>Offered Price</Dropdown.Header>
              <Dropdown.Item
                eventKey="3"
                onClick={sortByHighest}
                active={activeSortBy === "highest"}
              >
                Highest Price
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="4"
                onClick={sortByLowest}
                active={activeSortBy === "lowest"}
              >
                Lowest Price
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br></br>
          {loadingS ? (
            <Loader />
          ) : errorS ? (
            <Notification variant="danger" message={errorS} />
          ) : offersS == null ? (
            <Notification variant="danger" message="No such offers available" />
          ) : (
            <Row>
              {offersS.offers.length === 0 ? (
                <Alert variant="danger" className="d-none d-lg-block">
                  No such offers available
                </Alert>
              ) : (
                <SentOffers offers={offersS.offers} />
              )}
            </Row>
          )}
        </Tab>
        <Tab eventKey="sold" title="Sold Items">
          <h4>My Sold Items</h4>
          <Dropdown>
            <Dropdown.Toggle variant="dark">
              Sort By: {activeSortBy}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header>Time</Dropdown.Header>
              {/* <Dropdown.Menu as={ButtonGroup} title="Sort By" id="bg-nested-dropdown"> */}
              <Dropdown.Item
                eventKey="1"
                onClick={sortByNewest}
                active={activeSortBy === "newest"}
              >
                Newest Date
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={sortByOldest}
                active={activeSortBy === "oldest"}
              >
                Oldest Date
              </Dropdown.Item>
              <Dropdown.Header>Offered Price</Dropdown.Header>
              <Dropdown.Item
                eventKey="3"
                onClick={sortByHighest}
                active={activeSortBy === "highest"}
              >
                Highest Price
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="4"
                onClick={sortByLowest}
                active={activeSortBy === "lowest"}
              >
                Lowest Price
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br></br>
          <Form>
            <div key={`inline-switch`} className="mb-3">
              <Form.Check
                type="switch"
                label="Accepted Listings"
                name="checkbox1"
                onChange={handleAcceptedChange}
                checked={accepted}
              />
              <Form.Check
                type="switch"
                label="Completed Listings"
                name="checkbox2"
                onChange={handleCompletedChange}
                checked={completed}
              />
            </div>

            <Form.Group>
              <Form.Label>
                Listing Status:{" "}
                <Badge bg="primary">
                  {listingStatus ? listingStatus : "None"}
                </Badge>
              </Form.Label>
            </Form.Group>
          </Form>

          {loadingSO ? (
            <Loader />
          ) : errorSO ? (
            <Notification variant="danger" message={errorSO} />
          ) : offersSO == null ? (
            <Notification variant="danger" message="No such offers available" />
          ) : (
            <Row>
              {offersSO.offers.length === 0 ? (
                <Alert variant="danger" className="d-none d-lg-block">
                  No such offers available
                </Alert>
              ) : (
                <SoldOffers offers={offersSO.offers} />
              )}
            </Row>
          )}
        </Tab>

        <Tab eventKey="bought" title="Bought Items">
          <h4>My Bought Items</h4>
          <Dropdown>
            <Dropdown.Toggle variant="dark">
              Sort By: {activeSortBy}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Header>Time</Dropdown.Header>
              {/* <Dropdown.Menu as={ButtonGroup} title="Sort By" id="bg-nested-dropdown"> */}
              <Dropdown.Item
                eventKey="1"
                onClick={sortByNewest}
                active={activeSortBy === "newest"}
              >
                Newest Date
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="2"
                onClick={sortByOldest}
                active={activeSortBy === "oldest"}
              >
                Oldest Date
              </Dropdown.Item>
              <Dropdown.Header>Offered Price</Dropdown.Header>
              <Dropdown.Item
                eventKey="3"
                onClick={sortByHighest}
                active={activeSortBy === "highest"}
              >
                Highest Price
              </Dropdown.Item>
              <Dropdown.Item
                eventKey="4"
                onClick={sortByLowest}
                active={activeSortBy === "lowest"}
              >
                Lowest Price
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <br></br>
          
          <Form>
            <div key={`inline-switch`} className="mb-3">
              <Form.Check
                type="switch"
                label="Accepted Listings"
                name="checkbox1"
                onChange={handleAcceptedChange}
                checked={accepted}
              />
              <Form.Check
                type="switch"
                label="Completed Listings"
                name="checkbox2"
                onChange={handleCompletedChange}
                checked={completed}
              />
            </div>

            <Form.Group>
              <Form.Label>
                Listing Status:{" "}
                <Badge bg="primary">
                  {listingStatus ? listingStatus : "None"}
                </Badge>
              </Form.Label>
            </Form.Group>
          </Form>
          {loadingB ? (<Loader />) 
                  : errorB
                      ? (<Notification variant="danger" message={errorB} />) 
                          : offersB == null
                              ? (<Notification variant="danger" message="No such offers available" />)
                                  : (
                                      <Row>
                                          {offersB.offers.length === 0 ? (
                                            <Alert variant="danger" className="d-none d-lg-block">
                                                No such offers available
                                            </Alert>
                                          ) : (
                                            <BoughtOffers offers={offersB.offers}/>
                                          )}
                                      </Row>
              )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default OffersScreen;
