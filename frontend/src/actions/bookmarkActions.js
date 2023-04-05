import axios from "axios";
// Becase we are using thunk middleware,
// our actions will return a function instead of an action object
// and each action will be taking in dispatch as a parameter

//  IMPORTING CONSTANTS ----------------
import {
  BOOKMARK_PRODUCT_REQUEST,
  BOOKMARK_PRODUCT_SUCCESS,
  BOOKMARK_PRODUCT_FAIL,
} from "../constants/constants";
//---------------------------------------

// ACTION CREATORS ----------------
//  Action creator for getting a list of products
//  action object contains type and payload
export const bookmarkProduct = (productId) => async (dispatch, getState) => {
    try {
      dispatch({ type: BOOKMARK_PRODUCT_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
    const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/bookmark/${productId}`,
        {
          product: productId,
        },
        config
      );
  
      dispatch({
        type: BOOKMARK_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOKMARK_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };