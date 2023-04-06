import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
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
import { getUserReceivedOffers, getUserSentOffers} from "../actions/offerActions";
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
  // console.log(offersR)
  const offerSent = useSelector(state => state.offerSent);
  const {errorS, loadingS, offersS} = offerSent;

  //user cant access create listing page if not logged in
  const userRegister = useSelector(state => state.userLogin);
  let {userInfo} = userRegister;

  let sortByOldest = () => {
    setActiveSortBy("Oldest")
    dispatch(getUserReceivedOffers(username+"-oldest"))
    dispatch(getUserSentOffers(username+"-oldest"))
  }
  let sortByHighest = () => {
    setActiveSortBy("Highest Price")
    dispatch(getUserReceivedOffers(username+"-highest"))
    dispatch(getUserSentOffers(username+"-highest"))
  }
  let sortByLowest = () => {
    setActiveSortBy("Lowest Price")
    dispatch(getUserReceivedOffers(username+"-lowest"))
    dispatch(getUserSentOffers(username+"-lowest"))
  }

  let sortByNewest = () => {
    setActiveSortBy("Most Recent")
    dispatch(getUserReceivedOffers(username))
    dispatch(getUserSentOffers(username))
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
  }, [userInfo, username, dispatch])


  const [activeSortBy, setActiveSortBy] = useState("Most Recent");
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
                  <Dropdown.Item eventKey="1" onClick={sortByNewest} active={activeSortBy === "Most Recent"}>Newest Date</Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={sortByOldest} active={activeSortBy === "Oldest"}>Oldest Date</Dropdown.Item>
                  <Dropdown.Header>Offered Price</Dropdown.Header>
                    <Dropdown.Item eventKey="3" onClick={sortByHighest} active={activeSortBy === "Highest Price"}>Highest Price</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={sortByLowest} active={activeSortBy === "Lowest Price"}>Lowest Price</Dropdown.Item>
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
                  <Dropdown.Item eventKey="1" onClick={sortByNewest} active={activeSortBy === "Most Recent"}>Newest Date</Dropdown.Item>
                  <Dropdown.Item eventKey="2" onClick={sortByOldest} active={activeSortBy === "Oldest"}>Oldest Date</Dropdown.Item>
                  <Dropdown.Header>Offered Price</Dropdown.Header>
                    <Dropdown.Item eventKey="3" onClick={sortByHighest} active={activeSortBy === "Highest Price"}>Highest Price</Dropdown.Item>
                    <Dropdown.Item eventKey="4" onClick={sortByLowest} active={activeSortBy === "Lowest Price"}>Lowest Price</Dropdown.Item>
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
          </Tab>
          <Tab eventKey="bought" title="Bought Items">
          </Tab>
        </Tabs>        
    </div>

  )
}







export default OffersScreen