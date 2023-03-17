import React from 'react'
import {Alert, Form, Button} from 'react-bootstrap';

function SearchBar() {
    return (
        <div>
            <Form className='d-flex' style={{marginRight:"8px"}}>
                <Form.Control type='text' className='m-1'>    
                </Form.Control>

                <Button className='m-1' type='submit' variant='outline-success'>Search</Button>
                
            </Form>
        </div>

    )
}

export default SearchBar