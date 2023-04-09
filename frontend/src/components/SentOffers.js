import React from "react";
import Table from "react-bootstrap/Table";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteOfferAction } from "../actions/offerActions";
import { useDispatch } from "react-redux";
import { OFFER_EDIT_RESET } from "../constants/constants";

function SentOffers({ offers }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alertClicked = (slug) => {
    navigate("/profile/" + slug);
  };
  const productClicked = (id) => {
    navigate("/product/" + id);
  };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to Visit Profile
    </Tooltip>
  );

  const editOffer = (offer) => {
    console.log("editoffer", offer._id);
    dispatch({type: OFFER_EDIT_RESET})
    navigate("/edit/offer/" + offer._id);
  };

  const deleteToast = (offer) => {
    const toastId = toast.dark(
      <div>
        Are you sure? <br />
        <Button
          className="my-3"
          variant="danger"
          onClick={() => deleteOffer(offer)}
        >
          Yes
        </Button>
        <Button
          className="my-3"
          style={{ marginLeft: "10px" }}
          onClick={() => toast.dismiss(toastId)}
        >
          No
        </Button>
      </div>
    );
  };

  const deleteOffer = (offer) => {
    toast.dismiss();
    dispatch(deleteOfferAction(offer._id));
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
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th></th>
            <th>Seller Profile</th>
            <th>Offered Price</th>
            <th>Offered Time</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => (
            <tr>
              <td
                onClick={() => productClicked(offer.product._id)}
                style={{ cursor: "pointer" }}
              >
                {index + 1}
              </td>
              <td
                onClick={() => productClicked(offer.product._id)}
                style={{ cursor: "pointer" }}
              >
                {offer.product.name}
              </td>
              <td
                onClick={() => productClicked(offer.product._id)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={offer.product.image}
                  alt={offer.product.name}
                  style={{
                    height: "150px",
                    width: "250px",
                    objectFit: "cover",
                  }}
                />
              </td>

              <td>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip}
                >
                  <Button
                    variant="outline-dark"
                    onClick={() => alertClicked(offer.seller.username)}
                  >
                    @{offer.seller.username}
                  </Button>
                </OverlayTrigger>
              </td>

              <td>${offer.price}</td>
              <td>{new Date(offer.createdAt).toLocaleString()}</td>
              <td>
                <Button variant="success" onClick={() => editOffer(offer)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => deleteToast(offer)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SentOffers;
