import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useParams, useLocation, useNavigate, Link} from 'react-router-dom'

import { getUserProfileView } from "../actions/userLoginActions";
import { getUserReceivedOffers, getUserSentOffers} from "../actions/offerActions";
import { useDispatch, useSelector } from "react-redux";

import Notification from '../components/Notification';
import Loader from '../components/Loader'
import MyOffers from "../components/MyOffers";


function OffersScreen() {
  let { username } = useParams();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const {error, loading, userObj} = userDetails;
  // console.log(userDetails)

  const offerReceived = useSelector(state => state.offerReceived);
  console.log(offerReceived)
  const {errorR, loadingR, offersR} = offerReceived;
  console.log(offersR)
  // const offerSent = useSelector(state => state.offerSent);
  // const {errorS, loadingS, offersS} = offerSent;

  // useEffect is a hook that allows us to run a function when the component loads
  useEffect(() => {
      dispatch(getUserProfileView(username))
      dispatch(getUserReceivedOffers(username))
      dispatch(getUserSentOffers(username))
  }, [username, dispatch])

  return (
    <div>
        <Tabs
            defaultActiveKey="received"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
          <h4>My Received Offers</h4>
            <Tab eventKey="received" title="Received Offers">
              {loading ? (<Loader />) 
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