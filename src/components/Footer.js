import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col className='text-center'>
                    Copyright &copy; NTU Marketplace, Power Rangers SC2006, 2023 
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer