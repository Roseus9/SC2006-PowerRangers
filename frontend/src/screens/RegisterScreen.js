import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import FormContainer from "../components/FormContainer";
import InputGroup from "react-bootstrap/InputGroup";

import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userLoginActions";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Notification from "../components/Notification";
import Loader from "../components/Loader";
import { USER_LOGIN_RESET } from "../constants/constants";

function CreateListing() {
  let navigate = useNavigate();
  let location = useLocation();

  //redux
  //if user already logged in, they cannot register again
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  let { loading, userInfo } = userLogin;
  const userRegister = useSelector((state) => state.userRegister);
  let { error } = userRegister;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    } else {
      dispatch({ type: USER_LOGIN_RESET });
    }
    if (error && !userInfo) {
      toast.dark("❌ Username already Exists");
    }
  }, [userInfo, redirect, error]);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telegram, setTelegram] = useState("");
  const [message, setMessage] = useState("");
  const submitHandler = (e) => {
    // this prevents the default action from occurring,
    // e.g. prevent "submit" button to test some validation or processing of form data first.
    e.preventDefault();
    if (!name.match("^[a-zA-Zs.'-,]{1,50}$")) {
      toast.error("Invalid name, name can only contain letters and spaces");
      return;
    } else if (!username.match("^[a-zA-Z0-9_-]{3,16}$")) {
      if (username.length < 3 || username.length > 16) {
        toast.error(
          "Invalid Username length, Username needs to be 3-16 characters long"
        );
        return;
      } else {
        toast.error(
          "Invalid Username, Username can only contain letters, numbers, hyphens and underscores"
        );
        return;
      }
    } else if (
      !telegram.match("^(?=\\w{5,32}\\b)[a-zA-Z0-9]+(?:_[a-zA-Z0-9]+)*$")
    ) {
      toast.error(
        "Invalid Telegram Username. Username can only contain alphanumeric letters or underscore symbol. Minimum length of 5 is required."
      );
      return;
    } else if (password != confirmPassword) {
      toast.error("Passwords do not match");
      return;
    } else if (!password.match("^[a-zA-Z0-9@$!%*?&]{8,32}$")) {
      if (password.length < 8 || password.length > 32) {
        toast.error(
          "Invalid Password length, Passwords needs to be 8-32 characters long"
        );
        return;
      } else {
        toast.error(
          "Invalid Password, Password can only contain alphanumeric characters or special characters"
        );
        return;
      }
    } else {
      dispatch(register(name, username, email, password, telegram));
    }
  };
  return (
    <FormContainer>
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
      <h4>Register New User</h4>
      {/* if loading, display the loading message */}
      {loading && <Loader />}
      <hr />
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Telegram Handle</Form.Label>
          <InputGroup>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Control
              required
              type="text"
              placeholder="Handle"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="passwordId">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPasswordId">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="secondary" className="mb-3">
          Register
        </Button>
      </Form>
      <Row>
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default CreateListing;
