import React from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'


function Settings() {
  return (
    <div>
      <h4>Account Settings</h4>
      <hr />
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ width: '50%' }}>
        
        <Form.Group controlId="formFile" className="">
          <Col>
            <Form.Label>
              Profile Picture
            </Form.Label>
          </Col>
          <Col>
            <Form.Control type= "file" placeholder="Upload Photo(s)" />
          </Col>
        </Form.Group>
        
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <Form.Group className="">
            <Form.Label>First Name</Form.Label>
            <Form.Control placeholder="John"/>
          </Form.Group>

          <Form.Group className="">
            <Form.Label>Last Name</Form.Label>
            <Form.Control placeholder="Tan"/>
          </Form.Group>
        </div>

        <Form.Group className="">
          <Form.Label>Email *use NTU email for verified account</Form.Label>
          <Form.Control placeholder="johntan@e.ntu.edu.sg"/>
        </Form.Group>

        <Form.Group className="">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control placeholder="+65 8123 4567"/>
        </Form.Group>

        <Form.Group className="" >
          <Form.Label>Password</Form.Label>
          <Form.Control placeholder="" type="password" name="password"/>
        </Form.Group>

        <Form.Group className="">
          <Button variant="secondary" style={{backgroundColor:"#F24E1E", marginRight: "8px", marginTop: "5px"}}>Submit</Button>
          <Button variant="outline-secondary" style={{marginTop: "5px"}}>Cancel</Button>
        </Form.Group>

        </div>
      </div>
    </div>
  )
}

export default Settings
