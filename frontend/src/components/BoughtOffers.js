import React from "react";
import Table from "react-bootstrap/Table";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Tooltip from "react-bootstrap/Tooltip";
import Image from "react-bootstrap/Image";
import { ToastContainer, toast } from "react-toastify";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function BoughtOffers({offers}) {
    const navigate = useNavigate();
    const alertClicked = (slug) => {
        navigate("/profile/" + slug);
        };
    const productClicked = (id) => {
        navigate("/product/" + id);
        }; 
    const reviewClicked = (id) => {
        navigate("/review/" + id);
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
    const telegramClicked = (tele) => {
        toast.clearWaitingQueue();
        toast.dark(
            <div>
                ⚠️ This will redirect you to an external site, "telegram.com", proceed? <br />
                <Button className="my-3" onClick={() => {redirect(tele)}}>
                Yes
                </Button>
                <Button className="my-3" variant="danger" style={{ marginLeft: "10px" }}>
                No
                </Button>
            </div>
            , {toastId: "toastID", limit: 1});
    };
    const redirect = (tele) => {
        window.location.href = "https://web.telegram.org/k/#@"+tele;
    }


function BoughtOffers({ offers }) {
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
  const renderTooltipTelegram = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Redirect to Telegram Web Chat
    </Tooltip>
  );
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
  return (
    <div>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th></th>
            <th>Seller Profile</th>
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
                    height: "200px",
                    width: "350px",
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

                <td >
                    <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltipTelegram}
                    >
                    <Button variant="primary" onClick={()=> telegramClicked(offer.profile.telegram)}>@{offer.profile.telegram}</Button>
                    </OverlayTrigger>

                </td>

                <td>${offer.price}</td>
                <td>{new Date(offer.acceptedAt).toLocaleString()}</td>
                <td>{new Date(offer.completedAt ? offer.completedAt : "").toLocaleString()}</td>
                <td>
                    {offer.isComplete
                        ? <Button variant='outline-success' disabled>Sold</Button>
                        : <Button variant='warning' disabled>Pending</Button>
                    }
                </td>
                <td>
                    {offer.isComplete ?
                            (offer.isReviewedBuyer ?
                            <Button variant='success' disabled>Review</Button> :
                            <Button variant='success' onClick={() => reviewClicked(offer._id)}>Review</Button>
                            ) :
                        <></>
                    }
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
}

export default BoughtOffers;
