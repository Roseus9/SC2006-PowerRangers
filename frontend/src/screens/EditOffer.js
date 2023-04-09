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
import { useParams } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import { FormLabel } from "react-bootstrap";
import { OFFER_CREATE_RESET } from "../constants/constants";
import Loader from "../components/Loader";
import { getOffer, editOffer } from "../actions/offerActions";

function EditOffer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { oid } = useParams();
  const [price, setPrice] = useState(0);
  const userDetails = useSelector((state) => state.userDetails);
  let { userObj } = userDetails;
  let { user } = userObj;

  const getOfferState = useSelector((state) => state.getOffer);
  let { success, offer } = getOfferState;

  const editOfferState = useSelector((state) => state.offerEdit);
  // for when the cancel button is clicked
  const cancelClicked = () => {
    navigate("/offers/" + user.name);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getOffer(oid));
  }, [user]);

  useEffect(() => {
    //user can't acess edit offer page if the offer does not belong to them
    if (offer && user) {
      console.log("offer", offer.buyer);
      console.log("user", user.id);
      if (user && offer.buyer != user.id) {
        navigate("/");
      }
      setPrice(offer.price);
    }
  }, [offer, user]);

  useEffect(() => {
    if (editOfferState && editOfferState.success)
      navigate("/offers/" + user.username);
  }, [editOfferState]);

  const submitHandler = (e) => {
    console.log("test");
    e.preventDefault();
    if (price == "") {
      toast.error("Missing price!");
      return;
    }
    if (!price.match("^[0-9]+(.[0-9]{1,3})?$")) {
      toast.error("Invalid price!");
      return;
    }

    dispatch(editOffer(oid, price));
  };

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
                <Button
                  onClick={cancelClicked}
                  variant="outline-secondary"
                  style={{ marginTop: "5px" }}
                >
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

export default EditOffer;
