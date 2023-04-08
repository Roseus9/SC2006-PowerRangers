import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import producttags from "../constants/producttags";
import locations from "../constants/locations";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Papa from "papaparse";
import restrictedItems from "../constants/restrictedItems";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "../components/Notification";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getProduct, editProduct } from "../actions/productActions";
function EditListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { productID } = useParams();

  const item = useSelector((state) => state.productItem);
  const { error, loading, product } = item;

  const productEdit = useSelector((state) => state.productEdit);
  var { ...success } = productEdit;

  const userRegister = useSelector((state) => state.userLogin);
  let { userInfo = {} } = userRegister;
  const [title, setTitle] = useState();
  const [blurb, setBlurb] = useState();
  const [tags, setTags] = useState([]);
  const [deliveryFlag, setDeliveryFlag] = useState(false);
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [condition, setCondition] = useState("");
  const [places, setPlaces] = useState([]);
  const [price, setPrice] = useState(0);
  const [deliveryNotes, setDeliveryNotes] = useState("");
  let fileChangeFlag = false;
  // useEffect(() => {
  //   dispatch(getProduct(productID));

  //   if (product != {}) {
  //     console.log(product);
  //     setTitle(product.name);
  //     setBlurb(product.description);
  //     setCondition(product.condition == true ? "new" : "old");
  //     setPrice(product.price);
  //     setPreviewURL(product.image);
  //     setDeliveryFlag(product.delivery);

  //     console.log(product);
  //     var location_str_arr = product?.pickupLocations.split(",");
  //     const options = location_str_arr.map((location) => ({
  //       value: location.trim(),
  //       label: location.trim(),
  //     }));
  //     setPlaces(options);

  //     var tags_str_arr = product.tags.split(",");
  //     const tags_arr = tags_str_arr.map((tag) => ({
  //       value: tag.trim(),
  //       label: tag.trim(),
  //     }));
  //     setTags(tags_arr);

  //     if (product.delivery) setDeliveryNotes(product.notes);
  //     //prevent unauthorized access
  //     if (
  //       Object.keys(userInfo).length == 0 ||
  //       userInfo._id != item.product.seller
  //     ) {
  //       console.log("wrong user");
  //       navigate("/");
  //     }
  //   }
  // }, [productID, dispatch, navigate]);

  useEffect(() => {
    dispatch(getProduct(productID));
  }, [productID, navigate]);

  useEffect(() => {
    if (item.done == true) {
      console.log("effect", product);
      setTitle(product.name);
      setBlurb(product.description);
      setCondition(product.condition == true ? "new" : "old");
      setPrice(product.price);
      setPreviewURL(product.image);
      setDeliveryFlag(product.delivery);
      console.log(product);
      var location_str_arr = product?.pickupLocations.split(",");
      const options = location_str_arr.map((location) => ({
        value: location.trim(),
        label: location.trim(),
      }));
      setPlaces(options);
      var tags_str_arr = product.tags.split(",");
      const tags_arr = tags_str_arr.map((tag) => ({
        value: tag.trim(),
        label: tag.trim(),
      }));
      setTags(tags_arr);
      if (product.delivery) setDeliveryNotes(product.notes);
      //prevent unauthorized access
      if (
        Object.keys(userInfo).length == 0 ||
        userInfo._id != item.product.seller
      ) {
        console.log("wrong user");
        navigate("/");
      }
    }
  }, [item]);
  const cancelClicked = () => {
    console.log("cancel");
    navigate(`/product/${productID}`);
  };

  const submitHandler = (e) => {
    console.log("file", file);
    e.preventDefault();
    if (title == "") {
      toast.error("Missing title!");
      return;
    }
    if (restrictedItems.includes(title.toLowerCase())) {
      toast.error("Restricted item!");
      return;
    }

    if (blurb == "") {
      toast.error("Missing description!");
      return;
    }

    if (tags.length == 0) {
      toast.error("Missing item tags!");
      return;
    }
    if (price == "") {
      toast.error("Missing price!");
      return;
    }

    if (!price.match("^[0-9]+(.[0-9]{1,3})?$")) {
      toast.error("Invalid price!");
      return;
    }
    if (condition == "") {
      toast.error("Missing item condition!");
      return;
    }

    if (places.length == 0) {
      toast.error("Missing pick up locations!");
      return;
    }

    if (deliveryFlag && deliveryNotes == "") {
      toast.error("Missing delivery notes!");
      return;
    }
    var tags_arr = [];
    for (var i = 0; i < tags.length; i++) {
      tags_arr.push(tags[i].value);
    }
    var tags_str = tags_arr.join(",");

    var locations_arr = [];
    for (var i = 0; i < places.length; i++) {
      locations_arr.push(places[i].value);
    }
    var locations_str = locations_arr.join(",");
    let listing = new FormData();
    listing.append("name", title);
    listing.append("price", parseFloat(price).toFixed(2));
    listing.append("condition", condition == "new" ? true : false);
    listing.append("tags", tags_str);
    listing.append("description", blurb);
    listing.append("pickupLocations", locations_str);
    listing.append("delivery", deliveryFlag);
    listing.append("notes", deliveryFlag == true ? deliveryNotes : null);
    listing.append("image", file);
    listing.append("pid", productID);
    console.log("listing", listing);
    dispatch(editProduct(listing));
    console.log(success, "producteditsuccess");
    if (success) {
      navigate(`/product/${productID}`);
    }
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
        theme="light"
      />

      <Form onSubmit={submitHandler}>
        <h4>Create New Listing</h4>
        <hr />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "50%" }}>
            <Form.Group className="mb-3">
              <Form.Label>Listing Title</Form.Label>
              <Form.Control
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Col>
                <Form.Label>Display Picture</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="file"
                  placeholder="Upload Photo(s)"
                  accept="image/*"
                  onChange={(e) => {
                    const selectedFile = e.target.files[0];
                    setFile(selectedFile);
                    const reader = new FileReader();
                    reader.onload = () => {
                      setPreviewURL(reader.result);
                    };
                    reader.readAsDataURL(selectedFile);
                  }}
                />
              </Col>
            </Form.Group>
            {previewURL && (
              <img
                src={previewURL}
                alt="Preview"
                style={{ maxWidth: "100%", marginBottom: "1rem" }}
              />
            )}
            <Form.Group className="mb-3">
              <Form.Label>Listing Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write a short description about your listing..."
                style={{ height: "200px", marginTop: "0px" }}
                value={blurb}
                onChange={(e) => {
                  setBlurb(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Item Tags</Form.Label>
              <Select
                options={producttags}
                onChange={setTags}
                className="mb-3"
                placeholder="Choose item tags..."
                isMulti
                isSearchable
                autoFocus
                value={tags}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Choose price..."
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Condition</Form.Label>
              <Form.Select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option value="new">New</option>
                <option value="old">Old</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pick-up Locations</Form.Label>
              <Select
                options={locations}
                className="mb-3"
                onChange={setPlaces}
                placeholder="Choose locations..."
                isMulti
                isSearchable
                autoFocus
                value={places}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Delivery</Form.Label>
              <Form.Check
                checked={deliveryFlag}
                value={deliveryFlag}
                onChange={(e) => {
                  setDeliveryFlag(e.target.checked);
                  var locationBox = document.getElementById("deliveryBox");
                  locationBox.style.display = e.target.checked
                    ? "inline"
                    : "none";
                }}
              />
            </Form.Group>
            <Form.Group
              style={{ display: deliveryFlag ? "inline" : "none" }}
              className="mb-3"
              id="deliveryBox"
            >
              <Form.Label>Delivery Notes</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write your deliveryNotes..."
                style={{ height: "200px", marginTop: "0px" }}
                value={deliveryNotes}
                onChange={(e) => {
                  setDeliveryNotes(e.target.value);
                }}
              />
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
    </div>
  );
}

export default EditListing;
