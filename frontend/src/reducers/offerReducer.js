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


  export const offerReceivedReducer = (state = {}, action) => {
    switch (action.type) {
      case OFFER_RECEIVED_REQUEST:
        return { loadingR: true };
      case OFFER_RECEIVED_SUCCESS:
        return { loadingR: false, successR: true, offersR: action.payload };
      case OFFER_RECEIVED_FAIL:
        return { loadingR: false, errorR: action.payload };
      default:
        return state;
    }
  };

  export const offerSentReducer = (state = {}, action) => {
    switch (action.type) {
      case OFFER_SENT_REQUEST:
        return { loadingS: true };
      case OFFER_SENT_SUCCESS:
        return { loadingS: false, successS: true, offersS: action.payload };
      case OFFER_SENT_FAIL:
        return { loadingS: false, errorS: action.payload };
      default:
        return state;
    }
  };