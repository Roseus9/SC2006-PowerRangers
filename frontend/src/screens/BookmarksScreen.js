import React, { useEffect, useState }  from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'

import {useDispatch, useSelector} from 'react-redux';
import {register} from '../actions/userLoginActions';
import { ToastContainer, toast } from "react-toastify";
import {useParams, useLocation, useNavigate, Link} from 'react-router-dom'
import Notification from '../components/Notification';
import Loader from '../components/Loader';


function Settings() {
  let navigate = useNavigate();
  let location = useLocation();

  //redux
  //if user already logged in, they cannot register again
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const userRegister = useSelector(state => state.userLogin);
  let { loading, userInfo, error } = userRegister;
  useEffect(() => {
    error = null;
    if (!userInfo) {
      navigate("/login")
    }
  }, [userInfo, navigate])
  return (
    <div>
      <h4>Bookmarks</h4>
      <hr />
      <p>items go here</p>

    </div>
  )
}

export default Settings
