// Reducer takes in the state and an action and returns a new state

//  IMPORTING CONSTANTS ----------------
import {
    BOOKMARK_PRODUCT_REQUEST,
    BOOKMARK_PRODUCT_SUCCESS,
    BOOKMARK_PRODUCT_FAIL,
    BOOKMARK_REMOVE_REQUEST,
    BOOKMARK_REMOVE_SUCCESS,
    BOOKMARK_REMOVE_FAIL,
  } from "../constants/constants";
  //---------------------------------------
  
// Initial State of Bookmark Creation
const bookmarkCreateInitialState = {
    loading: false,
    // product?
    error: "",
  };
  
  const bookmarkRemoveInitialState = {
    loading: false,
    error: null,
  };

// REDUCERS ----------------
// Reducer for getting bookmarks
export const bookmarkCreateReducer = (state = bookmarkCreateInitialState, action) => {
    switch (action.type) {
        case BOOKMARK_PRODUCT_REQUEST:
            return {
              ...state,
              loading: true,
              error: null,
            };
          case BOOKMARK_PRODUCT_SUCCESS:
            return {
              ...state,
              loading: false,
              error: null,
            };
          case BOOKMARK_PRODUCT_FAIL:
            return {
              ...state,
              loading: false,
            };
          default:
            return state;
    };
}

export const bookmarkRemoveReducer = (state = bookmarkRemoveInitialState, action) => {
    switch (action.type) {
        case BOOKMARK_REMOVE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case BOOKMARK_REMOVE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case BOOKMARK_REMOVE_FAIL:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
