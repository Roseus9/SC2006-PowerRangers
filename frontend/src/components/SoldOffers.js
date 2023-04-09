import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { completeOffer } from "../actions/offerActions";
import { OFFER_COMPLETE_RESET } from "../constants/constants";

function SoldOffers({ offers }) {
  console.log("offers", offers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const completeState = useSelector((state) => state.offerComplete);
  const alertClicked = (slug) => {
    navigate("/profile/" + slug);
  };

  const productClicked = (id) => {
    navigate("/product/" + id);
  };
  const reviewClicked = (id) => {
    navigate("/review/" + id);
  };
  const telegramClicked = (tele) => {
    toast.clearWaitingQueue();
    toast.dark(
      <div>
        ⚠️ This will redirect you to an external site, "telegram.com", proceed?{" "}
        <br />
        <Button
          className="my-3"
          onClick={() => {
            redirect(tele);
          }}
        >
          Yes
        </Button>
        <Button
          className="my-3"
          variant="danger"
          style={{ marginLeft: "10px" }}
        >
          No
        </Button>
      </div>,
      { toastId: "toastID", limit: 1 }
    );
  };
  const redirect = (tele) => {
    window.location.href = "https://web.telegram.org/k/#@" + tele;
  };
  const completeClicked = (id, flag) => {
    toast.clearWaitingQueue();
    if (flag) {
      toast.warning(
        <div>
          <strong>
            NOTE: Completing this offer will decline ALL other offers for the
            same product!{" "}
          </strong>
          <br></br>
          <br></br>
          Proceed to finalise transaction with buyer?
          <br></br>
          <Button
            className="my-3"
            onClick={() => {
              completeAction(id, flag);
            }}
          >
            Yes
          </Button>
          <Button
            className="my-3"
            variant="danger"
            style={{ marginLeft: "10px" }}
          >
            No
          </Button>
        </div>,

        { toastId: "toastID", limit: 1, pauseOnHover: false }
      );
    } else {
      toast.error(
        <div>
          Decline this accepted offer?
          <br></br>
          <Button
            className="my-3"
            onClick={() => {
              completeAction(id, flag);
            }}
          >
            Yes
          </Button>
          <Button
            className="my-3"
            variant="danger"
            style={{ marginLeft: "10px" }}
          >
            No
          </Button>
        </div>
      );
    }
  };
  const completeAction = (id, flag) => {
    toast.dismiss();
    dispatch(completeOffer(id, flag));
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to Visit Profile
    </Tooltip>
  );
  const renderTooltipTelegram = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Redirect to Telegram Web Chat
    </Tooltip>
  );

  return (
    <div>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th></th>
            <th>Buyer Profile</th>
            <th>Telegram Chat</th>
            <th>Offered</th>
            <th>Accepted⭕</th>
            <th>Completed🔴</th>
            <th>Manage Transaction</th>
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
                    onClick={() => alertClicked(offer.buyer.username)}
                  >
                    @{offer.buyer.username}
                  </Button>
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltipTelegram}
                >
                  <Button
                    variant="primary"
                    onClick={() => telegramClicked(offer.profile.telegram)}
                  >
                    @{offer.profile.telegram}
                  </Button>
                </OverlayTrigger>
              </td>
              <td>${offer.price}</td>
              <td>{new Date(offer.acceptedAt).toLocaleString()}</td>
              <td>
                {offer.isComplete &&
                  new Date(offer.completedAt).toLocaleString()}
                {!offer.isComplete && <emp>Not completed!</emp>}
              </td>

              <td>
                {offer.isComplete ? (
                  <Button variant="outline-success " disabled>
                    Sold
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => completeClicked(offer._id, true)}
                  >
                    Complete
                  </Button>
                )}
              </td>
              <td>
                {offer.isComplete ? (
                  offer.isReviewedSeller ? (
                    <Button variant="success" disabled>
                      Review
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => reviewClicked(offer._id)}
                    >
                      Review
                    </Button>
                  )
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => completeClicked(offer._id, false)}
                  >
                    Decline
                  </Button>
                )}
              </td>

              <></>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default SoldOffers;
