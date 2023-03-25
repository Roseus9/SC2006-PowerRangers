import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useLocation, useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {login} from '../actions/userLoginActions'
import Notification from '../components/Notification'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

function LoginScreen() {
    //router props
    let navigate = useNavigate();
    let location = useLocation();

    //redux
    const dispatch = useDispatch();

    // if user is already logged in,they cannot log in again 
    //  so when they try to go to login page, useEffect triggers, where we will redirect them back to the page "/{redirect}"" 
    // ==================================================================================
    // ?redirect=${redirect} is a query string, we extract {redirect}
    const redirect = location.search ? location.search.split('=')[1] : '/'  
    //  useSelector is a hook that allows us to access the state
    const userLogin = useSelector(state => state.userLogin);
    //  refer to the userLoginReducer for the structure of userLogin state object
    const { loading, userInfo, error } = userLogin;
    //  useEffect second parameter is array of dependencies, the effect will only run when dependencies change
    //      performance optimization that can help avoid unnecessary re-renders
    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect])

    //  useState for email and password
    //      email and password are needed to be passed into our login() action creator
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const submitHandler = (e) => {
        // this prevents the default action from occurring, 
        // e.g. prevent "submit" button to test some validation or processing of form data first. 
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (

        <FormContainer>
            <h1>Login</h1>
            {/* if there is an error, display the error message */}
            {error && <Notification variant='danger' message={error}/>}
            {/* if loading, display the loading message */}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                <Form.Group style={{marginTop:'10px'}} controlId = 'emailId' placeholder>     
                    <Form.Label>
                        Username
                    </Form.Label>
                    {/* Each for control can state the type, whether its email, password validation etc. */}
                    <Form.Control
                        type='text'
                        placeholder='Enter username'
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Form.Group style={{marginTop:'10px'}} controlId = 'passwordId' placeholder>
                    <Form.Label>
                        Password
                    </Form.Label>
                    {/* Each for control can state the type, whether its email, password validation etc. */}
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant="secondary" style={{backgroundColor:"#F24E1E", marginRight: "8px", marginTop: "10px"}}>Submit</Button>
            </Form>
            {/* 
                this is the text below to ask the customer to register
                    if they are new to the website
            */}
            <Row>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>

    )
}

export default LoginScreen