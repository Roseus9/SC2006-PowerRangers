import React from 'react'
import Form from 'react-bootstrap/Form';

function CreateListing() {
  return (
    <div>
    <>
      <Form.Group className="mb-3">
        <Form.Label>Listing Title</Form.Label>
        <Form.Control placeholder="Title"/>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className='fa-photo-video'>Display Picture</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Condition</Form.Label>
        <Form.Select>
          <option>Choose...</option>
          <option>New</option>
          <option>Old</option>
        </Form.Select>
      </Form.Group>
    </>
    </div>
  )
}

export default CreateListing
