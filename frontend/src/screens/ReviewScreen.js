import React, {useEffect, useState} from 'react'
import { Row, Col, Message, Form, Button, ListGroup } from 'react-bootstrap'


function ReviewScreen() {
  return (
    <div>
        <h1>Make Review</h1>
        <Row>
            <Col md={6} sm={12}>
                <Form>
                    <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select'>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='textarea' row='3'>    
                        </Form.Control>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button  type='submit' variant='primary' style={{marginTop:'10px'}}>Submit</Button>
                    </div>
                    
                </Form>
            </Col>
            <Col>
                <ListGroup variant='flushed'>
                    <ListGroup.Item>
                        <h5>On User: </h5>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5>On Product: </h5>
                    </ListGroup.Item>
                </ListGroup>

            </Col>

        </Row>
    </div>
  )
}

export default ReviewScreen