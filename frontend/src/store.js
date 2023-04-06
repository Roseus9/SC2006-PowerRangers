// import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productItemReducer,
} from "./reducers/productReducer";
import { userDetailsReducer, userLoginReducer, userRegisterReducer } from "./reducers/userReducer";
// import thunk from 'redux-thunk'
// import { combineReducers } from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import { productCreateReducer } from "./reducers/productReducer";
import { offerCreateReducer, offerReceivedReducer, offerSentReducer } from "./reducers/offerReducer";


const store = configureStore({
  reducer: {
    productList: productListReducer,
    productItem: productItemReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    productCreate: productCreateReducer,
    offerCreate: offerCreateReducer,
    offerSent: offerSentReducer,
    offerReceived: offerReceivedReducer,
    userDetails: userDetailsReducer,
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
