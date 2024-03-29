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
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
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
      return { loading: true, done: false, products: [] };
    case PRODUCT_LIST_SUCCESS:
      // if succesful, return a payload of data with the products to the state
      return { loading: false, done: true, products: action.payload };
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
      return { loading: false, done: true, product: action.payload };
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
        sucess: false,
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
        sucess: false,
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
//test

export const productEditReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQUEST:
      return {
        loading: true,
      };

    case PRODUCT_EDIT_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case PRODUCT_EDIT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_EDIT_RESET:
      return {
        loading: false,
        success: false,
      };
    default:
      return state;
  }
};

export const productDeleteReducer = (
  state = productListInitialState,
  action
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true, done: false };
    case PRODUCT_DELETE_SUCCESS:
      // if succesful, return a payload of data with the products to the state
      return { loading: false, done: true };
    // if there is an error, return a new attribute error, passing in the response from the payload
    case PRODUCT_DELETE_FAIL:
      return { loading: false, done: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return { loading: false, done: false };
    // if none of the above, return the initial state
    default:
      return state;
  }
};
