import { 
    OFFER_CREATE_REQUEST,
    OFFER_CREATE_SUCCESS,
    OFFER_CREATE_FAIL
  } from '../constants/constants';
  
  export const offerCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case OFFER_CREATE_REQUEST:
        return { loading: true };
      case OFFER_CREATE_SUCCESS:
        return { loading: false, success: true, offer: action.payload };
      case OFFER_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


// // Reducer takes in the state and an action and returns a new state

// //  IMPORTING CONSTANTS ----------------
// import {
//     OFFER_CREATE_REQUEST,
//     OFFER_CREATE_SUCCESS,
//     OFFER_CREATE_FAIL,
//   } from "../constants/constants";
//   //---------------------------------------
  
// export const offerCreateReducer = (state = {}, action) => {
//     switch (action.type) {
//       case OFFER_CREATE_REQUEST:
//         return {
//           loading: true,
//         };
  
//       case OFFER_CREATE_SUCCESS:
//         return {
//           loading: false,
//           success: true,
//           offer: action.payload,
//         };
//       case OFFER_CREATE_FAIL:
//         return {
//           loading: false,
//           error: action.payload,
//         };
  
//       default:
//         return state;
//     }
// };
  