import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge';
import Row from "react-bootstrap/Row";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useParams, useLocation, useNavigate, Link} from 'react-router-dom'

import { getUserProfileView } from "../actions/userLoginActions";
import { getUserReceivedOffers, getUserSentOffers, getUserBoughtOffers, getUserSoldOffers} from "../actions/offerActions";
import { useDispatch, useSelector } from "react-redux";

import Notification from '../components/Notification';
import Loader from '../components/Loader'
import MyOffers from "../components/MyOffers";
import SentOffers from "../components/SentOffers";


function OffersScreen() {
  let { username } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const {error, loading, userObj} = userDetails;
  // console.log(userDetails)

  const offerReceived = useSelector(state => state.offerReceived);
  // console.log(offerReceived)
  const {errorR, loadingR, offersR} = offerReceived;
  console.log('dog')
  console.log(offersR)
  const offerSent = useSelector(state => state.offerSent);
  const {errorS, loadingS, offersS} = offerSent;
  console.log('cat')
  console.log(offersS)

  //user cant access create listing page if not logged in
  const userRegister = useSelector(state => state.userLogin);
  let {userInfo} = userRegister;

// states for filtering
const [activeSortBy, setActiveSortBy] = useState("newest");
const [accepted, setAccepted] = useState(true);
const [completed, setCompleted] = useState(true);

// function for filtering accepted or completed listings
const handleCheckboxChange = (event) => {
  const { name, checked } = event.target;

  if (name === "checkbox1") {
    setAccepted(checked);
  } else if (name === "checkbox2") {
    setCompleted(checked);
  }
};

let listingStatus = "all";

if (accepted && completed) {
  listingStatus = "all";
} else if (accepted) {
  listingStatus = "accepted";
} else if (completed) {
  listingStatus = "completed";
}

// functions for filtering listings
  let sortByOldest = () => {
    setActiveSortBy("oldest")
    dispatch(getUserReceivedOffers(username+"-"+activeSortBy))
    dispatch(getUserSentOffers(username+"-"+activeSortBy))
    dispatch(getUserBoughtOffers(username+"-"+activeSortBy+"-"+listingStatus))
    dispatch(getUserSoldOffers(username+"-"+activeSortBy+"-"+listingStatus))
  }
  let sortByHighest = () => {
    setActiveSortBy("highest")
    dispatch(getUserReceivedOffers(username+"-"+activeSortBy))
    dispatch(getUserSentOffers(username+"-"+activeSortBy))
    dispatch(getUserBoughtOffers(username+"-"+activeSortBy+"-"+listingStatus))
    dispatch(getUserSoldOffers(username+"-"+activeSortBy+"-"+listingStatus))
  }
  let sortByLowest = () => {
    setActiveSortBy("lowest")
    dispatch(getUserReceivedOffers(username+"-"+activeSortBy))
    dispatch(getUserSentOffers(username+"-"+activeSortBy))
    dispatch(getUserBoughtOffers(username+"-"+activeSortBy+"-"+listingStatus))
    dispatch(getUserSoldOffers(username+"-"+activeSortBy+"-"+listingStatus))
  }

  let sortByNewest = () => {
    setActiveSortBy("newest")
    dispatch(getUserReceivedOffers(username))
    dispatch(getUserSentOffers(username))
    dispatch(getUserBoughtOffers(username+"-"+activeSortBy+"-"+listingStatus))
    dispatch(getUserSoldOffers(username+"-"+activeSortBy+"-"+listingStatus))
  }

  // useEffect is a hook that allows us to run a function when the component loads
  useEffect(() => {

      if (!userInfo) {
        navigate("/login")
      }
      else if (userInfo.username !== username) {
        navigate("/")
      }
      dispatch(getUserProfileView(username))
      dispatch(getUserReceivedOffers(username))
      dispatch(getUserSentOffers(username))
      dispatch(getUserBoughtOffers(username))
      dispatch(getUserSoldOffers(username))
  }, [userInfo, username, dispatch])


  return (
    
    <div>
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

                <Dropdown.Menu >
                  <Dropdown.Header>Time</Dropdown.Header>
                  {/* <Dropdown.Menu as={ButtonGroup} title="Sort By" id="bg-nested-dropdown"> */}
                  <Dropdown.Item eventKey="1" onClick={sortByNewest} active={activeSortBy === "newest"}>Newest Date</Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={sortByOldest} active={activeSortBy === "oldest"}>Oldest Date</Dropdown.Item>
                  <Dropdown.Header>Offered Price</Dropdown.Header>
                    <Dropdown.Item eventKey="3" onClick={sortByHighest} active={activeSortBy === "highest"}>Highest Price</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={sortByLowest} active={activeSortBy === "lowest"}>Lowest Price</Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
              <br></br>
              {loadingR ? (<Loader />) 
                  : errorR
                      ? (<Notification variant="danger" message={errorR} />) 
                          : offersR == null
                              ? (<Notification variant="danger" message="No Received Offers found" />)
                                  : (
                                      <Row>
                                          {offersR.offers.length === 0 ? (
                                          <Alert variant="danger" className="d-none d-lg-block">
                                              No Received Offers
                                          </Alert>
                                          ) : (
                                            <MyOffers offers={offersR.offers}/>
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

                <Dropdown.Menu >
                  <Dropdown.Header>Time</Dropdown.Header>
                  {/* <Dropdown.Menu as={ButtonGroup} title="Sort By" id="bg-nested-dropdown"> */}
                  <Dropdown.Item eventKey="1" onClick={sortByNewest} active={activeSortBy === "newest"}>Newest Date</Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={sortByOldest} active={activeSortBy === "oldest"}>Oldest Date</Dropdown.Item>
                  <Dropdown.Header>Offered Price</Dropdown.Header>
                    <Dropdown.Item eventKey="3" onClick={sortByHighest} active={activeSortBy === "highest"}>Highest Price</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={sortByLowest} active={activeSortBy === "lowest"}>Lowest Price</Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
              <br></br>
              {loadingS ? (<Loader />) 
                  : errorS
                      ? (<Notification variant="danger" message={errorS} />) 
                          : offersS == null
                              ? (<Notification variant="danger" message="No Sent Offers found" />)
                                  : (
                                      <Row>
                                          {offersS.offers.length === 0 ? (
                                          <Alert variant="danger" className="d-none d-lg-block">
                                              No Sent Offers
                                          </Alert>
                                          ) : (
                                            <SentOffers offers={offersS.offers}/>
                                          )}
                                      </Row>
                )}
          </Tab>                             
          <Tab eventKey="sold" title="Sold Items">
          <h4>My Sold Items</h4>
              <Dropdown >
                    <Dropdown.Toggle variant="dark">
                      Sort By: {activeSortBy}
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                      <Dropdown.Header>Time</Dropdown.Header>
                      {/* <Dropdown.Menu as={ButtonGroup} title="Sort By" id="bg-nested-dropdown"> */}
                      <Dropdown.Item eventKey="1" onClick={sortByNewest} active={activeSortBy === "newest"}>Newest Date</Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={sortByOldest} active={activeSortBy === "oldest"}>Oldest Date</Dropdown.Item>
                      <Dropdown.Header>Offered Price</Dropdown.Header>
                        <Dropdown.Item eventKey="3" onClick={sortByHighest} active={activeSortBy === "highest"}>Highest Price</Dropdown.Item>
                        <Dropdown.Item eventKey="4" onClick={sortByLowest} active={activeSortBy === "lowest"}>Lowest Price</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <br></br>
                <Form>
                    <div key={`inline-switch`} className="mb-3">
                      <Form.Check
                        type="switch"
                        label="Accepted Listings"
                        name="checkbox1"
                        onChange={handleCheckboxChange}
                        checked={accepted}
                      />
                      <Form.Check
                        type="switch"
                        label="Completed Listings"
                        name="checkbox2"
                        onChange={handleCheckboxChange}
                        checked={completed}
                      />
                    </div>

                  <Form.Group>

                    <Form.Label>
                      Listing Status: <Badge bg="primary" >{listingStatus ? listingStatus : "None"}</Badge>
                    </Form.Label>
                  </Form.Group>
                </Form>    

          </Tab>
          <Tab eventKey="bought" title="Bought Items">
          <h4>My Bought Items</h4>
              <Dropdown >
                    <Dropdown.Toggle variant="dark">
                      Sort By: {activeSortBy}
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                      <Dropdown.Header>Time</Dropdown.Header>
                      {/* <Dropdown.Menu as={ButtonGroup} title="Sort By" id="bg-nested-dropdown"> */}
                      <Dropdown.Item eventKey="1" onClick={sortByNewest} active={activeSortBy === "newest"}>Newest Date</Dropdown.Item>
                      <Dropdown.Item eventKey="2" onClick={sortByOldest} active={activeSortBy === "oldest"}>Oldest Date</Dropdown.Item>
                      <Dropdown.Header>Offered Price</Dropdown.Header>
                        <Dropdown.Item eventKey="3" onClick={sortByHighest} active={activeSortBy === "highest"}>Highest Price</Dropdown.Item>
                        <Dropdown.Item eventKey="4" onClick={sortByLowest} active={activeSortBy === "lowest"}>Lowest Price</Dropdown.Item>
                  </Dropdown.Menu>
                  </Dropdown>
                  <br></br>
                <Form>
                    <div key={`inline-switch`} className="mb-3">
                      <Form.Check
                        type="switch"
                        label="Accepted Listings"
                        name="checkbox1"
                        onChange={handleCheckboxChange}
                        checked={accepted}
                      />
                      <Form.Check
                        type="switch"
                        label="Completed Listings"
                        name="checkbox2"
                        onChange={handleCheckboxChange}
                        checked={completed}
                      />
                    </div>

                  <Form.Group>

                    <Form.Label>
                      Listing Status: <Badge bg="primary" >{listingStatus ? listingStatus : "None"}</Badge>
                    </Form.Label>
                  </Form.Group>
                </Form>    
          </Tab>
        </Tabs>        
    </div>

  )
}







export default OffersScreen