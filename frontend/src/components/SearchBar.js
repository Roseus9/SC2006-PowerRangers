import React, {useState} from 'react'
import {Alert, Form, Button} from 'react-bootstrap'
// Allow us to have access to the history prop inside our component. 
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBar() {
    
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword)
        {
            navigate(`/?keyword=${keyword}`)
        }
        else{
            navigate(location.pathname)
        }
    }
    
    return (
        <div>
            <Form className='d-flex' style={{marginRight:"8px"}} onSubmit={submitHandler}>
                <Form.Control
                type = 'text'
                name = 'q'
                onChange = { (e) => setKeyword(e.target.value)}
                className='m-1'>
                </Form.Control>

                <Button className='m-1' type='submit' variant='outline-success'>Search</Button>
                
            </Form>
        </div>

    )
}
export default SearchBar