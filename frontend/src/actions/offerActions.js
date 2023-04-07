import axios from "axios";
// Becase we are using thunk middleware,
// our actions will return a function instead of an action object
// and each action will be taking in dispatch as a parameter

//  IMPORTING CONSTANTS ----------------
import {
  OFFER_CREATE_REQUEST,
  OFFER_CREATE_SUCCESS,
  OFFER_CREATE_FAIL,

  OFFER_RECEIVED_REQUEST,
  OFFER_RECEIVED_SUCCESS,
  OFFER_RECEIVED_FAIL,

  OFFER_SENT_REQUEST,
  OFFER_SENT_SUCCESS,
  OFFER_SENT_FAIL,

  OFFER_BOUGHT_REQUEST,
  OFFER_BOUGHT_SUCCESS,
  OFFER_BOUGHT_FAIL,
  
  OFFER_SOLD_REQUEST,
  OFFER_SOLD_SUCCESS,
  OFFER_SOLD_FAIL,

} from "../constants/constants";
//---------------------------------------

// ACTION CREATORS ----------------
//  Action creator for getting a list of products
//  action object contains type and payload

export const createOffer = (price, product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OFFER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/offer/product/${product}`, {"price":price, "product":product}, config);

    dispatch({
      type: OFFER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OFFER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//  Action creator for getting a single users received offers
//  action object contains type and payload
export const getUserReceivedOffers = (slug) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_RECEIVED_REQUEST });
    const { data } = await axios.get(`/api/offer/received/${slug}`);
    console.log("GET RECEIVED OFFERS RETURNED SUCCESSFULLY! returned data:", data);
    dispatch({ type: OFFER_RECEIVED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: OFFER_RECEIVED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

//  Action creator for getting a single users sent offers
//  action object contains type and payload
export const getUserSentOffers = (slug) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_SENT_REQUEST });
    const { data } = await axios.get(`/api/offer/sent/${slug}`);
    console.log("GET SENT OFFERS RETURNED SUCCESSFULLY! returned data:", data);
    dispatch({ type: OFFER_SENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: OFFER_SENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}


//  Action creator for getting a single users sold listings
//  action object contains type and payload
export const getUserSoldOffers = (slug) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_SOLD_REQUEST });
    const { data } = await axios.get(`/api/offer/sold/${slug}`);
    console.log("GET SOLD OFFERS RETURNED SUCCESSFULLY! returned data:", data);
    dispatch({ type: OFFER_SOLD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: OFFER_SOLD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

//  Action creator for getting a single users bought listings
//  action object contains type and payload
export const getUserBoughtOffers = (slug) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_BOUGHT_REQUEST });
    const { data } = await axios.get(`/api/offer/bought/${slug}`);
    console.log("GET BOUGHT OFFERS RETURNED SUCCESSFULLY! returned data:", data);
    dispatch({ type: OFFER_BOUGHT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: OFFER_BOUGHT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}