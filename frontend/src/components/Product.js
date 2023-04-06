import React from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'


function Product({product}) {
  return (
    <Card className='my-3 p-3 rounded' style={{ height: '504px' }}>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' style={{ height: '250px', objectFit: 'cover' }}/>
        </Link>

        <Card.Body>
            <Link to={`/product/${product._id}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as='div'>
                <div className='my-3'>
                    <Rating value={product.rating} />
                    {product.rating} from {product.numReviews} reviews
                </div>
            </Card.Text>
            <Card.Text as='h3' className='my-3'>
                ${product.price}
            </Card.Text>
            <Button variant='primary'>Bookmark</Button>

        </Card.Body>
    </Card>
  )
}

export default Product