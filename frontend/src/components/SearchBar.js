import React, {useState, useEffect} from 'react'
import {Alert, Form, Button} from 'react-bootstrap'
// Allow us to have access to the history prop inside our component. 
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBar() {
    
    const [keyword, setKeyword] = useState('');
    const [tags, setTags] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword && tags)
        {
            navigate(`/?keyword=${keyword}&tags=${tags}`)
        }
        else if(keyword)
        {
            navigate(`/?keyword=${keyword}`)
        }
        else if(tags)
        {
            navigate(`/?tags=${tags}`)
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
                className='m-1'
                placeholder='Search'
                id = 'search'>
                </Form.Control>

                <Form.Select
                name = 't'
                onChange={(e) => setTags(e.target.value)}
                className="m-1"
                placeholder="Filter"
                id = 'tags'
              >
                <option value=""> All </option>
                <option value="Hall">Hall</option>
                <option value="Washing Products">Washing Products</option>
                <option value= "Cleaning Products">Cleaning Products</option>
                <option value= "Toiletries">Toiletries</option>
                <option value= "Facial Products">Facial Products</option>
                <option value= "Clothes">Clothes</option>
                <option value= "Food">Food</option>
                <option value= "Drinks">Drinks</option>
                <option value= "Alcohol">Alcohol</option>
                <option value= "Cutlery">Cutlery</option>
                <option value= "Serveware">Serveware</option>
                <option value= "Bags">Bags</option>
                <option value= "Furniture">Furniture</option>
                <option value= "Fan">Fan</option>
                <option value= "Portable Air Con">Portable Air Con</option>
                <option value= "Monitor">Monitor</option>
                <option value= "Shoes">Shoes</option>
                <option value= "Slippers">Slippers</option>
                <option value= "Books">Books</option>
                <option value= "Academic Materials">Academic Materials</option>
                <option value= "Stationery">Stationery</option>
                <option value= "Wires">Wires</option>
              </Form.Select>

                <Button className='m-1' type='submit' variant='outline-success'>Search</Button>
                
            </Form>
        </div>

    )
}
export default SearchBar