import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import Select from 'react-select';
import producttags from '../constants/producttags';

// Allow us to have access to the history prop inside our component.
import { useNavigate, useLocation } from 'react-router-dom';

function FilterDropDown() {
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = (e) => {
    e.preventDefault();
    if (tags) {
      navigate(`/?tags=${tags}`);
    }
  };

  return (
    <div>
      <Form onSubmit={submitHandler} inline>
      <Form.Select
                name = 't'
                onChange={(e) => setTags(e.target.value)}
                className="mr-sm-2 ml-sm-5"
                placeholder="Filter"
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
        <button type="submit" className="btn btn-primary">
          Apply
        </button>
      </Form>
    </div>
  );
}

export default FilterDropDown;