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
import { OFFER_CREATE_RESET } from "../constants/constants";
import Loader from "../components/Loader";


function CreateOffer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const offerCreate = useSelector((state) => state.offerCreate);
  const { offer, error, success, oloading } = offerCreate;

  const [price, setPrice] = useState("");
  const [product, setProduct] = useState("");
  // extract out the ID of the product being offered
  const { productID } = useParams();
  // for when the cancel button is clicked
  const cancelClicked = () => {
    navigate("/product/" + productID);
  };

  //user cant access create offer page if not logged in
  const userRegister = useSelector(state => state.userLogin);
  let { loading, userInfo } = userRegister;
  useEffect(() => {
    setProduct(productID)
    if (success) {
       dispatch({ type: OFFER_CREATE_RESET });
       navigate("/");
     }
    if (!userInfo) {
        navigate("/login")
    }
    if (error) {
      toast.error("Failed to make Offer, Invalid Value");
      dispatch({ type: OFFER_CREATE_RESET });
    }
  }, [userInfo, navigate, success, error])

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
        theme="dark"
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
                  }}
                />
              </InputGroup>
            </Form.Group>
              <Form.Group className="mb-3">
                {oloading ? <Loader/> :
                 <> 
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
                  <Button onClick={cancelClicked} variant="outline-secondary" style={{ marginTop: "5px" }}>
                    Cancel
                  </Button>  
                  </>              
                }

              </Form.Group>
            </div>
          </div>
        </Form>
      </FormContainer>
    </div>
  );
}

export default CreateOffer;

