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
function CreateListing() {
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [tags, setTags] = useState([]);
  const [pickupFlag, setPickupFlag] = useState(false);
  const [deliveryFlag, setDeliveryFlag] = useState(false);
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [condition, setCondition] = useState("");
  const [places, setPlaces] = useState([]);
  const [price, setPrice] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (title == "") {
      toast.error("Missing title!");
      return;
    }
    if (previewURL == null) {
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
    if (!price.match("^[0-9]+[.[0-9]{1,3}]{0,1}$")) {
      toast.error("Invalid price!");
      return;
    }
    if (condition == "") {
      toast.error("Missing item condition!");
      return;
    }

    if (!pickupFlag && !deliveryFlag) {
      toast.error("i have no idea how to phrase this shit");
      return;
    }

    if (pickupFlag && places.length == 0) {
      toast.error("Missing pick up locations!");
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
              <Form.Label>Pick-Up</Form.Label>
              <Form.Check
                value={pickupFlag}
                onChange={(e) => {
                  setPickupFlag(e.target.checked);
                  var locationBox = document.getElementById("locationBox");
                  locationBox.style.display = e.target.checked
                    ? "inline"
                    : "none";
                }}
              />
            </Form.Group>
            <Form.Group
              style={{ display: pickupFlag ? "inline" : "none" }}
              className="mb-3"
              id="locationBox"
            >
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
              <Button variant="outline-secondary" style={{ marginTop: "5px" }}>
                Cancel
              </Button>
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default CreateListing;
