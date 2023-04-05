import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Notification from '../components/Notification';
import { useNavigate } from "react-router-dom";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function OffersScreen() {

    // const dispatch = useDispatch();
    // const productList = useSelector((state) => state.offerList);
    // const { error, loading, offers } = offerList;
    // const userDetails = useSelector(state => state.userDetails);
    // const {error, loading, userObj} = userDetails;

    // useEffect is a hook that allows us to run a function when the component loads
    // useEffect(() => {
    //     dispatch(getProducts());
    // }, [dispatch]);
  
  return (
    <div>
        <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
        >
            <Tab eventKey="received" title="Sold Items">
            </Tab>
            <Tab eventKey="sent" title="Bought Items">
            </Tab>
 
            <Tab eventKey="received" title="Received Offers">
            </Tab>
            <Tab eventKey="sent" title="Sent Offers">
            </Tab>
        </Tabs>        
    </div>

  )
}







export default OffersScreen