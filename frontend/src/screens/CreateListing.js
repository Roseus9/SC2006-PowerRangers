import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import producttags from "../constants/producttags";
import locations from "../constants/locations";
import Select from "react-select"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import restrictedItems from "../constants/restrictedItems";
import { createProduct } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Notification from '../components/Notification';
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../constants/constants";
import Loader from "../components/Loader";
function CreateListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [tags, setTags] = useState([]);
  const [deliveryFlag, setDeliveryFlag] = useState(false);
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [condition, setCondition] = useState("");
  const [places, setPlaces] = useState([]);
  const [price, setPrice] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  // for popup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // product creation
  const productCreate = useSelector((state) => state.productCreate);
  let { product, error, success } = productCreate;

  //user cant access create listing page if not logged in
  const userRegister = useSelector(state => state.userLogin);
  let { loading, userInfo} = userRegister;


  useEffect(() => {

    if (success) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate("/");
    }
    if (!userInfo) {
        navigate("/login")
    }
  }, [userInfo, navigate, success])

  const cancelClicked = () => {
    navigate("/");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (title == "") {
      toast.error("Missing title!");
      return;
    }
    if (restrictedItems.includes(title.toLowerCase())) {
      toast.error("Restricted item!");
      return;
    }
    if (!file) {
      toast.error("Missing image!");
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
    if (!price.match("^[0-9]+([.[0-9]{1,3}])?$")) {
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
    listing.append("price", price);
    listing.append("condition", condition == "new" ? true : false);
    listing.append("tags", tags_str);
    listing.append("description", blurb);
    listing.append("pickupLocations", locations_str);
    listing.append("delivery", deliveryFlag);
    listing.append("notes", deliveryFlag == true ? deliveryNotes : null);
    listing.append("image", file);
    // const listing = {
    //   name: title,
    //   price: price,
    //   condition: condition == "new" ? true : false,
    //   tags: tags_str,
    //   description: blurb,
    //   pickupLocations: locations_str,
    //   delivery: deliveryFlag,
    //   notes: deliveryFlag == true ? deliveryNotes : null,
    //   image: file,


    dispatch(createProduct(listing));
    if (success) {
      navigate("/");
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
        theme="dark"
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
                placeholder="Write any additional delivery information for the buyer..."
                style={{ height: "200px", marginTop: "0px" }}
                value={deliveryNotes}
                onChange={(e) => {
                  setDeliveryNotes(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">

              {productCreate.loading ? <Loader/> :
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
                    <Button
                      onClick={cancelClicked}
                      variant="outline-secondary"
                      style={{ marginTop: "5px" }}
                    >
                      Cancel
                    </Button>
                  </>              
                }
            </Form.Group>
          </div>
        </div>
      </Form>
      {error && <Notification variant='danger' message={error}/>}          
    </div>
  );
}

export default CreateListing;
