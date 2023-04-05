// Reducer takes in the state and an action and returns a new state

//  IMPORTING CONSTANTS ----------------
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_ITEM_REQUEST,
  PRODUCT_ITEM_SUCCESS,
  PRODUCT_ITEM_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
} from "../constants/constants";
//---------------------------------------

//  INITIAL STATE OF PRODUCT LIST ----------------
const productListInitialState = {
  loading: false,
  products: [],
  error: "",
};

// REDUCERS ----------------
// Reducer for getting a list of products
export const productListReducer = (state = productListInitialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      // if succesful, return a payload of data with the products to the state
      return { loading: false, products: action.payload };
    // if there is an error, return a new attribute error, passing in the response from the payload
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    // if none of the above, return the initial state
    default:
      return state;
  }
};

//  INITIAL STATE OF PRODUCT ----------------
const productInitialState = {
  loading: false,
  product: {},
  error: "",
};

// Reducer for getting a single product
export const productItemReducer = (state = productInitialState, action) => {
  switch (action.type) {
    case PRODUCT_ITEM_REQUEST:
      return { loading: true, product: {} };
    case PRODUCT_ITEM_SUCCESS:
      // if succesful, return a payload of data with the products to the state
      return { loading: false, product: action.payload };
    // if there is an error, return a new attribute error, passing in the response from the payload
    case PRODUCT_ITEM_FAIL:
      return { loading: false, error: action.payload };
    // if none of the above, return the initial state
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };

    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_CREATE_RESET:
      return {
        loading: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
};

export const productTopReducer = (state = {products:[]}, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return {
        loading: true,
        products: []
      };

    case PRODUCT_TOP_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_TOP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

