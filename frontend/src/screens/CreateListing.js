import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import producttags from "../constants/producttags";
import locations from "../constants/locations";
import Select from "react-select";

function CreateListing() {
  const [tags, setTags] = useState([]);
  const [places, setPlaces] = useState([]);

  return (
    <div>
      <h4>Create New Listing</h4>
      <hr />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "50%" }}>
          <Form.Group className="mb-3">
            <Form.Label>Listing Title</Form.Label>
            <Form.Control placeholder="Title" />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Col>
              <Form.Label>Display Picture</Form.Label>
            </Col>
            <Col>
              <Form.Control type="file" placeholder="Upload Photo(s)" />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Listing Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Write a short description about your listing..."
              style={{ height: "200px", marginTop: "0px" }}
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
            <Form.Select>
              <option>Choose...</option>
              <option>New</option>
              <option>Old</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pick-up Locations</Form.Label>
            <Select
              options={locations}
              className="mb-3"
              placeholder="Choose locations..."
              isMulti
              isSearchable
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Button
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
    </div>
  );
}

export default CreateListing;
