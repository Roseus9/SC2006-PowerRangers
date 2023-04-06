import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'


function Product2({product}) {
  return (
    <Card className='my-3 p-3 rounded' style={{ height: '300px'}}>
        <Link to={`/product/${product._id}` }>
            <Card.Img src={product.image} variant='top' style={{ height: '150px', width: '100%', objectFit: 'cover' }}/>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='h3' className='my-3'>
                ${product.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product2