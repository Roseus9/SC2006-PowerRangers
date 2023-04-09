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
  OFFER_COMPLETE_REQUEST,
  OFFER_COMPLETE_SUCCESS,
  OFFER_COMPLETE_FAIL,
  OFFER_COMPLETE_GET_REQUEST,
  OFFER_COMPLETE_GET_SUCCESS,
  OFFER_COMPLETE_GET_FAIL,
  OFFER_COMPLETE_GET_RESET,
  OFFER_SOLD_REQUEST,
  OFFER_SOLD_SUCCESS,
  OFFER_SOLD_FAIL,
  OFFER_RESPOND_REQUEST,
  OFFER_RESPOND_SUCCESS,
  OFFER_RESPOND_FAIL,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_RESET,
  REVIEW_GET_REQUEST,
  REVIEW_GET_SUCCESS,
  REVIEW_GET_FAIL,
  REVIEW_GET_RESET,
  OFFER_DELETE_REQUEST,
  OFFER_DELETE_SUCCESS,
  OFFER_DELETE_FAIL,
  OFFER_GET_REQUEST,
  OFFER_GET_SUCCESS,
  OFFER_GET_FAIL,
  OFFER_GET_RESET,
  OFFER_EDIT_REQUEST,
  OFFER_EDIT_SUCCESS,
  OFFER_EDIT_FAIL,
} from "../constants/constants";
//---------------------------------------

// ACTION CREATORS ----------------
//  Action creator for creating an offer
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
    const { data } = await axios.post(
      `/api/offer/product/${product}`,
      { price: price, product: product },
      config
    );

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
    console.log(
      "GET RECEIVED OFFERS RETURNED SUCCESSFULLY! returned data:",
      data
    );
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
};

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
};

//  Action creator for getting a single users sold listings
//  action object contains type and payload
export const getUserSoldOffers = (slug) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_SOLD_REQUEST });
    const { data } = await axios.get(`/api/offer/sold/${slug}`);
    console.log("GET SOLD OFFERS RETURNED SUCCESSFULLY! returned data:", data);
    dispatch({ type: OFFER_SOLD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: OFFER_SOLD_FAIL });
  }
};

export const respondOfferAction = (oid, flag) => async (dispatch, getState) => {
  try {
    dispatch({ type: OFFER_RESPOND_REQUEST });
    console.log(oid, flag);
    console.log(`/api/offer/${oid}/${flag}`);
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/offer/${oid}/${flag}`, {}, config);
    dispatch({ type: OFFER_RESPOND_SUCCESS, payload: data, flag: flag });
  } catch (error) {
    dispatch({
      type: OFFER_RESPOND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//  Action creator for getting a single users bought listings
//  action object contains type and payload
export const getUserBoughtOffers = (slug) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_BOUGHT_REQUEST });
    const { data } = await axios.get(`/api/offer/bought/${slug}`);
    console.log(
      "GET BOUGHT OFFERS RETURNED SUCCESSFULLY! returned data:",
      data
    );
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
};

export const deleteOfferAction = (oid) => async (dispatch, getState) => {
  try {
    dispatch({ type: OFFER_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/offerdelete/${oid}`, {}, config);
    dispatch({ type: OFFER_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: OFFER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOffer = (oid) => async (dispatch, getState) => {
  try {
    dispatch({ type: OFFER_GET_REQUEST });
    console.log(typeof oid);
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/getoffer/${oid}`, {}, config);
    dispatch({ type: OFFER_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: OFFER_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editOffer = (oid, price) => async (dispatch, getState) => {
  try {
    dispatch({ type: OFFER_EDIT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/editoffer/${oid}`,
      { price: price },
      config
    );
    dispatch({ type: OFFER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: OFFER_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//  Action creator for putting in a completed offer
// flag == true means the offer is completed
// flag == false means the offer is to be declined
//  action object contains type and payload
export const completeOffer = (id, flag) => async (dispatch, getState) => {
  try {
    dispatch({ type: OFFER_COMPLETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/offer/complete/${id}/${flag}`,
      {},
      config
    );
    console.log("COMPLETE OFFERS SUCCESSFULLY UPDATED! returned data:", data);
    dispatch({ type: OFFER_COMPLETE_SUCCESS, payload: data, flag: flag });
  } catch (error) {
    dispatch({
      type: OFFER_COMPLETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


//  Action creator for getting a specific completed offer
export const getCompleteOfferAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: OFFER_COMPLETE_GET_REQUEST });

    const { data } = await axios.get(`/api/offer/get/complete/${id}`);
    console.log("COMPLETE OFFERS SUCCESSFULLY OBTAINED! returned data:", data);
    dispatch({ type: OFFER_COMPLETE_GET_SUCCESS, payload: data});
  } catch (error) {
    dispatch({
      type: OFFER_COMPLETE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//  Action creator for creating a review
export const createReviewAction = (review, offerID, userID, flag) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REVIEW_CREATE_REQUEST,
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
    const { data } = await axios.post(`/api/offer/review/create/${offerID}/${userID}/${flag}`, review, config);

    dispatch({
      type: REVIEW_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//  Action creator for getting all reviews of a user
export const getReviewAction = (userID, flag) => async (dispatch) => {
  try {
    dispatch({
      type: REVIEW_GET_REQUEST,
    });

    const { data } = await axios.get(`/api/offer/review/get/${userID}/${flag}`);
    console.log("SUCCESSFULLY RECEIVED REVIEWS!", data)
    dispatch({
      type: REVIEW_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REVIEW_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};