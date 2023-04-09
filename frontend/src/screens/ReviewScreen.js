import React, {useEffect, useState} from 'react'
import { Row, Col, Message, Form, Button, ListGroup, Card, Alert, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCompleteOfferAction } from '../actions/offerActions';
import { ToastContainer, toast } from "react-toastify";
import { createReviewAction } from '../actions/offerActions';
import Loader from '../components/Loader';
import { REVIEW_CREATE_RESET } from '../constants/constants';
import Spinner from 'react-bootstrap/Spinner';



function ReviewScreen() {
    let { offerID } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rating, setRating] = useState("0");
    const [comment, setComment] = useState('');
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const completeOffer = useSelector((state) => state.getCompleteOffer);
    const { offers } = completeOffer;

    const createReview = useSelector((state) => state.createReview);
    const { loading, review, error, success } = createReview;
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(rating)
        if (rating === "0") {
            toast.error('Please select a rating');
            return;
        }
        if (comment === '') {
            toast.error('Please enter a comment');
            return;
        }
        
        // if user is buyer
        let review = new FormData();
        if(userInfo._id === offers?.offer?.buyer?.id){
            review.append("buyer", userInfo._id);
            review.append("seller", offers?.offer?.seller?.id);
            review.append("content", comment);
            review.append("rating", rating);
            review.append("product", offers?.offer?.product?._id)
            review.append("flag", true);
            dispatch(createReviewAction(review, offerID, userInfo._id, "true"));
        }
        // if user is seller
        else {
            review.append("buyer", offers?.offer?.buyer?.id);
            review.append("seller", userInfo._id);
            review.append("content", comment);
            review.append("rating", rating);
            review.append("product", offers?.offer?.product?._id)
            review.append("flag", false);
            dispatch(createReviewAction(review, offerID, userInfo._id, "false"));
        }   
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        }
        dispatch(getCompleteOfferAction(offerID))

    }, [userInfo, offerID])

    useEffect(() => {
        if (success) {
            navigate('/')
        }
        if(error){
            toast.error("Failed to Submit Review")
            dispatch({type: REVIEW_CREATE_RESET})
        }

    }, [error, success])

    const alertClicked = () => {
        userInfo._id === offers.offer.buyer.id ?
        navigate("/profile/" + offers.offer.seller.username)
            : navigate("/profile/" + offers.offer.buyer.username)
    };
    return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
        <h1>Make Review✍️</h1>
        <Row>
            <Col md={6} sm={12}>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select'
                            onChange={(e) => {
                                const selectedRating  = e.target.value;
                                setRating(selectedRating); 
                            }}
                            onBlur={(e) => {
                                const selectedRating = e.target.value;
                                setRating(selectedRating); 
                            }}
                            required
                        >
                            <option value='0'></option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment' 
                        onChange={(e) => {
                            const comments = e.target.value;
                            setComment(comments ); 
                        }}
                    >
                        <Form.Label>Review Content</Form.Label>
                        <Form.Control as='textarea' row='3'>    
                        </Form.Control>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        {loading ?  <Loader/> :
                            <Button  type='submit' variant='success' style={{marginTop:'10px'}}>Submit</Button>
                        }

                    </div>
                    
                </Form>
            </Col>
            <Col>
                <ListGroup variant='flushed'>
                
                <ListGroup.Item>

                    <Alert variant="success">
                    {completeOffer.loading ? <Loader/> : 
                    <>
                        <Alert.Heading> Review on
                            {offers ?
                                userInfo._id === offers?.offer?.buyer?.id ?
                                    " Seller:"
                                    : " Buyer:"
                                : "No User Found"
                            }
                        </Alert.Heading>
                        <div className="d-grid gap-2">
                            <Button onClick={alertClicked} size="md" variant="dark"> 
                                {offers ?
                                            userInfo._id === offers.offer.buyer.id ?
                                            offers.offer.seller.username
                                                : offers.offer.buyer.username
                                            : "No User Found"
                                        }                        
                            </Button>
                        </div>
                        <hr />
                        <p className="mb-0">
                            NOTE: Reviews will not be editable once submitted.
                        </p>                      
                    </>
                    }
                    </Alert>                       
            

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5>On Product: </h5>
                        {completeOffer.loading ? 
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                           : 
                            <Card className="d-flex flex-row">

                                <Card.Img style={{ height: '100px', width: '150px', objectFit: 'cover' }} src={offers?.offer?.product?.image} alt={offers?.offer?.product?.name}/>
                                <Card.Body>
                                    <Card.Title>{offers?.offer?.product?.name}</Card.Title>
                                    <Card.Text>
                                        <h6>
                                            ${offers?.offer?.price}
                                        </h6>

                                    </Card.Text>
                                    <div className="d-flex justify-content-between">
                                    </div>
                                </Card.Body>

                            </Card>
                        }
                    </ListGroup.Item>
                </ListGroup>
 
                       
            </Col>

        </Row>
    </div>
    )
}

export default ReviewScreen