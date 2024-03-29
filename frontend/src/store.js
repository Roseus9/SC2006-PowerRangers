// import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productItemReducer,
  productEditReducer,
  productDeleteReducer,
  productCreateReducer,
} from "./reducers/productReducer";
import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
// import thunk from 'redux-thunk'
// import { combineReducers } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import {
  changeBookmarkReducer,
  findBookmarkReducer,
  findUserBookmarkReducer,
  getBookmarkReducer,
} from "./reducers/bookmarkReducer";
// importing the offer reducers
import {
  offerCreateReducer,
  offerReceivedReducer,
  offerSentReducer,
  offerBoughtReducer,
  offerSoldReducer,
  offerRespondReducer,
  offerCompleteReducer,
  getCompleteOfferReducer,
  createReviewReducer,
  getReviewReducer,
  offerDeleteReducer,
  getOfferReducer,
  editOfferReducer,
} from "./reducers/offerReducer";

// const initialState = {}
// const middleware = [thunk]
// const reducer = combineReducers({
//   productList: productListReducer,
// })

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productItem: productItemReducer,
    productEdit: productEditReducer,
    productDelete: productDeleteReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    productCreate: productCreateReducer,
    getOffer: getOfferReducer,
    offerCreate: offerCreateReducer,
    offerDelete: offerDeleteReducer,
    offerSent: offerSentReducer,
    offerEdit: editOfferReducer,
    offerReceived: offerReceivedReducer,
    offerRespond: offerRespondReducer,
    offerBought: offerBoughtReducer,
    offerSold: offerSoldReducer,
    userDetails: userDetailsReducer,
    getBookmark: getBookmarkReducer,
    changeBookmark: changeBookmarkReducer,
    findBookmark: findBookmarkReducer,
    findUserBookmark: findUserBookmarkReducer,
    offerComplete: offerCompleteReducer,
    userUpdate: userUpdateReducer,
    getCompleteOffer: getCompleteOfferReducer,
    createReview: createReviewReducer,
    getReview: getReviewReducer,
  },
  preloadedState: {
    userLogin: {
      userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    },
  },
});

export default store;
