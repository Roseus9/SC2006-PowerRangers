// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { createOffer } from "../actions/offerActions";
// import { Form, Button } from "react-bootstrap";
// import Message from "../components/Notification";
// import Loader from "../components/Loader";
// import FormContainer from "../components/FormContainer";

// const CreateOffer = ({ history }) => {
//   const dispatch = useDispatch();

//   const [price, setPrice] = useState("");
//   const [message, setMessage] = useState(null);

//   const { productId } = useParams();

//   const offerCreate = useSelector((state) => state.offerCreate);
//   const { loading, error, success } = offerCreate;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   useEffect(() => {
//     if (!userInfo) {
//       history.push("/login");
//     }
//     if (success) {
//       history.push("/");
//     }
//   }, [userInfo, history, success]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (price === "") {
//       setMessage("Please enter a price");
//     } else {
//       dispatch(createOffer(productId, price));
//       setPrice("");
//     }
//   };

//   return (
//     <FormContainer>
//       <h1>Make an Offer</h1>
//       {message && <Message variant="danger">{message}</Message>}
//       {error && <Message variant="danger">{error}</Message>}
//       {loading && <Loader />}
//       <Form onSubmit={submitHandler}>
//         <Form.Group controlId="price">
//           <Form.Label>Price</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           ></Form.Control>
//         </Form.Group>

//         <Button type="submit" variant="primary">
//           Submit
//         </Button>
//       </Form>
//     </FormContainer>
//   );
// };

// export default CreateOffer;


import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOffer } from "../actions/offerActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useParams } from 'react-router-dom';
import InputGroup from 'react-bootstrap/InputGroup';
import { FormLabel } from "react-bootstrap";



function CreateOffer() {
  const offerCreate = useSelector((state) => state.offerCreate);
  const { offer, error, success } = offerCreate;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
  const {productID} = useParams();


  // let {productId} and const {productId} are both ways of destructuring
  // an object and extracting a property named userId from it. 
  // let {productId} declares a mutable variable using the let keyword, 
  // which means you can assign a new value to it later in your code
  // const {userId} declares an immutable variable using the const keyword, 
  // which means its value cannot be reassigned once it is set
  

  //user cant access create offer page if not logged in
  const userRegister = useSelector(state => state.userLogin);
  let { loading, userInfo } = userRegister;
  useEffect(() => {
    if (success) {
       navigate("/");
     }
    if (!userInfo) {
        navigate("/login")
    }
  }, [userInfo, navigate, success])

  const submitHandler = (e) => {
    e.preventDefault();
    if (price == "") {
      toast.error("Missing price!");
      return;
    }
    if (!price.match("^[0-9]+(.[0-9]{1,3})?$")) {
      toast.error("Invalid price!");
      return;
    }

    dispatch(createOffer(price, product));
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
        theme="light"
      />
      <FormContainer>
        <h4>Make an offer</h4>
        <Form onSubmit={submitHandler}>
          <hr />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "50%" }}>
            <Form.Group className="mb-3">
              <FormLabel>Offered Price</FormLabel>
              <InputGroup className="d-flex align-items-center">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setProduct(productID);
                  }}
                />
              </InputGroup>
            </Form.Group>
              <Form.Group className="mb-3">
                <Button
                  type="submit"
                  variant="secondary"
                  style={{
                    backgroundColor: "#F24E1E",
                    marginRight: "8px",
                    marginTop: "5px",
                  }}
                >
                  Submit
                </Button>
                  <Button variant="outline-secondary" style={{ marginTop: "5px" }}>
                    Cancel
                  </Button>
              </Form.Group>
            </div>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
}

export default CreateOffer;

