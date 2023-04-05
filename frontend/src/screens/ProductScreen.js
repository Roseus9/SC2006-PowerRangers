import {React, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Notification from '../components/Notification'
import { Link } from 'react-router-dom'


import {Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../actions/productActions'
import { useNavigate } from 'react-router-dom';
import { bookmarkProduct } from '../actions/bookmarkActions';


// here we deconstruct the props object, to access match
function ProductScreen() {
    let navigate = useNavigate();
    // useParam is a hook that allows us to access the url parameters 
    let { itemId } = useParams();
    const dispatch = useDispatch();
    const item = useSelector(state => state.productItem);
    const {error, loading, product} = item;
    // useEffect is a hook that allows us to run a function when the component loads
    useEffect(() => {
        dispatch(getProduct(itemId))
    }, [itemId, dispatch])

    const alertClicked = () => {
        navigate("/profile/" + product.username);
      };

    function addToBookmarkHandler() {
        dispatch(bookmarkProduct(itemId))
    }

    // function ProductScreen({match}) {
    // const item = products.find((product)=> product._id === match.params.itemId)
    // OR
    // let { itemId } = useParams();
    // const item = products.find((product)=> product._id === itemId)

    // format date
    const dateString = product.createdAt;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString();

    return (
        <div>
            {loading ? <Loader/>
                : error ? <Notification variant='danger' message={error}/>
                :
                <Row>
                    <Col md={6} sm={12}>
                        {/* must add  fluid to ensure the iamge doesnt pop out of the container */}
                        <Image src={product.image} alt={product.name} fluid / >
                    </Col>
                    <Col md={3} sm={12}>
                        <ListGroup variant='flushed'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Condition: {product.condition ? 'New' : 'Used'}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Delivery: {product.delivery}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Additional Notes: {product.additionalNotes}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Tags: {product.tags}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Listed Time: {formattedDate}
                                {/* Listed Time: {product.createdAt} */}
                            </ListGroup.Item>
                            <ListGroup.Item action variant="warning" onClick={alertClicked}>
                                Sold By: {product.username}
                                {/* Listed Time: {product.createdAt} */}
                            </ListGroup.Item>
                            {/* <ListGroup.Item>
        
                            </ListGroup.Item>    */}
                        </ListGroup>
                        <Button
                            onClick = {addToBookmarkHandler} 
                            className='my-3' 
                            variant='primary'
                            type='button'>
                            Bookmark
                        </Button>
                        <Link to={`/offer/product/${product._id}`}>
                            <Button className='my-3' variant='danger' style={{marginLeft: "10px"}}>Make Offer</Button> 
                        </Link>
                    </Col>
                </Row>

            }   
        </div>

    )
}

export default ProductScreen