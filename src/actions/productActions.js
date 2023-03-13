import axios from 'axios'

import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_ITEM_REQUEST,
    PRODUCT_ITEM_SUCCESS,
    PRODUCT_ITEM_FAIL,
  } from '../constants/productConstants'

  
  export const getProducts = () => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })
      const { data } = await axios.get('/api/products')
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ 
        type: PRODUCT_LIST_FAIL, 
        payload: error.response && error.response.data.message ? error.response.data.message : error.message 
      })
    }
  }

  export const getProduct = (itemId) => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_ITEM_REQUEST })
      const { data } = await axios.get(`/api/products/${itemId}`)
      dispatch({ type: PRODUCT_ITEM_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ 
        type: PRODUCT_ITEM_FAIL, 
        payload: error.response && error.response.data.message ? error.response.data.message : error.message 
      })
    }
  }