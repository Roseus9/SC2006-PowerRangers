import React from 'react'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import { Card, Button } from 'react-bootstrap'
//import Rating from './Rating'
import { Link } from 'react-router-dom'

/*
To add:
    User profile pic and name at top
    Backend connection
    Bought/Sold seperate links or show/hide elements?
    update layout to grid, looks nicer
*/

function Transactions() {
  return (
  <div>
    <h4>Transactions</h4>
    <hr />
    <Button variant='primary' style={{marginRight: "8px"}}>Bought</Button>
    <Button variant='primary'>Sold</Button>

    <br/><br/>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' , borderStyle: 'solid', borderRadius: '25px', background: "khaki" }}>
      <div style={{ width: '80%' }}>
      
      <Card className='my-3 p-3 rounded' style={{  background: 'lavender', borderRadius: '25px'}}>
            {/* <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link> */}

            <Card.Body>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    {/* <Link to={`/product/${product._id}`}>
                        <Card.Title as='div'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link> */}

                    {/* Change to Card.img after */}
                    <Card.Text as='h3'> 
                        <div className='my-3'>
                            Image
                        </div>
                    </Card.Text>
                    <Card.Text as='h3' className='my-3'>
                        Description
                        <h5>Item details, sold to who</h5>
                    </Card.Text>
                    <div style={{ display: '', justifyContent: ''}}>
                        <div><Button variant='primary'>View Chat</Button></div>
                        <div><Button variant='primary'>Leave Review</Button></div>
                    </div>
                    
                </div>
            </Card.Body>
        </Card>

        <Card className='my-3 p-3 rounded' style={{  background: 'lavender', borderRadius: '25px'}}>
            {/* <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link> */}

            <Card.Body>
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                    {/* <Link to={`/product/${product._id}`}>
                        <Card.Title as='div'>
                            <strong>{product.name}</strong>
                        </Card.Title>
                    </Link> */}
                    <Card.Text as='h3'>
                        <div className='my-3'>
                            Image
                        </div>
                    </Card.Text>
                    <Card.Text as='h3' className='my-3'>
                        Description
                        <h5>Item details, sold to who</h5>
                    </Card.Text>
                    <div style={{ display: '', justifyContent: ''}}>
                        <div><Button variant='primary'>View Chat</Button></div>
                        <div><Button variant='primary'>Complete</Button></div>
                    </div>
                    
                </div>
            </Card.Body>
        </Card>
      </div>
    </div>
  </div>
  )
}

//margin-right: 100px;

export default Transactions
