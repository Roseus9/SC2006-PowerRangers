import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// Children is a prop that is passed in from the parent component
function FormContainer({children}) {
  return (
    <Container>
      {/* text middle to center it */}
        <Row className="justify-content-md-center">
          
            <Col className='text-middle' xs={12} md={6}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer