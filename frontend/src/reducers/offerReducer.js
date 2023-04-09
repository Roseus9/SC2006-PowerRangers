import {
  OFFER_CREATE_REQUEST,
  OFFER_CREATE_SUCCESS,
  OFFER_CREATE_FAIL,
  OFFER_CREATE_RESET,
  OFFER_RECEIVED_REQUEST,
  OFFER_RECEIVED_SUCCESS,
  OFFER_RECEIVED_FAIL,
  OFFER_SENT_REQUEST,
  OFFER_SENT_SUCCESS,
  OFFER_SENT_FAIL,
  OFFER_RESPOND_REQUEST,
  OFFER_RESPOND_SUCCESS,
  OFFER_RESPOND_FAIL,
  OFFER_RESPOND_RESET,
  OFFER_BOUGHT_REQUEST,
  OFFER_BOUGHT_SUCCESS,
  OFFER_BOUGHT_FAIL,
  OFFER_COMPLETE_REQUEST,
  OFFER_COMPLETE_SUCCESS,
  OFFER_COMPLETE_FAIL,
  OFFER_COMPLETE_RESET,
  OFFER_SOLD_REQUEST,
  OFFER_SOLD_SUCCESS,
  OFFER_SOLD_FAIL,
  OFFER_COMPLETE_GET_REQUEST,
  OFFER_COMPLETE_GET_SUCCESS,
  OFFER_COMPLETE_GET_FAIL,
  OFFER_COMPLETE_GET_RESET,
  REVIEW_CREATE_REQUEST,
  REVIEW_CREATE_SUCCESS,
  REVIEW_CREATE_FAIL,
  REVIEW_CREATE_RESET,
  REVIEW_GET_REQUEST,
  REVIEW_GET_SUCCESS,
  REVIEW_GET_FAIL,
  REVIEW_GET_RESET,

} from "../constants/constants";



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

 
  
  export const offerCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case OFFER_CREATE_REQUEST:
        return { oloading: true };
      case OFFER_CREATE_SUCCESS:
        return { oloading: false, success: true, offer: action.payload };
      case OFFER_CREATE_FAIL:
        return { oloading: false, error: action.payload };
      case OFFER_CREATE_RESET:
        return { oloading: false, success:false, error: null};
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


  export const offerBoughtReducer = (state = {}, action) => {
    switch (action.type) {
      case OFFER_BOUGHT_REQUEST:
        return { loadingB: true };
      case OFFER_BOUGHT_SUCCESS:
        return { loadingB: false, successB: true, offersB: action.payload };
      case OFFER_BOUGHT_FAIL:
        return { loadingB: false, errorB: action.payload };
      default:
        return state;
    }
  };

  export const offerSoldReducer = (state = {}, action) => {
    switch (action.type) {
      case OFFER_SOLD_REQUEST:
        return { loadingSO: true };
      case OFFER_SOLD_SUCCESS:
        return { loadingSO: false, successSO: true, offersSO: action.payload };
      case OFFER_SOLD_FAIL:
        return { loadingSO: false, errorSO: action.payload };
      default:
        return state;
    }
  };

export const offerRespondReducer = (state = {}, action) => {
  switch (action.type) {
    case OFFER_RESPOND_REQUEST:
      return { loading: true, success: false };
    case OFFER_RESPOND_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
        flag: action.flag,
      };
    case OFFER_RESPOND_FAIL:
      return { loading: false, error: action.payload };
    case OFFER_RESPOND_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};


export const offerCompleteReducer = (state = {}, action) => {
  switch (action.type) {
    case OFFER_COMPLETE_REQUEST:
      return { loading: true, success: false };
    case OFFER_COMPLETE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload,
        flag: action.flag,
      };
    case OFFER_COMPLETE_FAIL:
      return { loading: false, error: action.payload };
    case OFFER_COMPLETE_RESET:
      return { loading: false, success: false, flag: null };
    default:
      return state;
  }
};



export const getCompleteOfferReducer = (state = {}, action) => {
  switch (action.type) {
    case OFFER_COMPLETE_GET_REQUEST:
      return { loading: true, success: false };
    case OFFER_COMPLETE_GET_SUCCESS:
      return {
        loading: false,
        success: true,
        offers: action.payload,
      };
    case OFFER_COMPLETE_GET_FAIL:
      return { loading: false, error: action.payload };
    case OFFER_COMPLETE_GET_RESET:
      return { loading: false, success: false};
    default:
      return state;
  }
};

export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_CREATE_REQUEST:
      return { loading: true, success: false };
    case REVIEW_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        review: action.payload,
      };
    case REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_CREATE_RESET:
      return { loading: false, success: false, error: false};
    default:
      return state;
  }
};

export const getReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case REVIEW_GET_REQUEST:
      return { loading: true, success: false };
    case REVIEW_GET_SUCCESS:
      return {
        loading: false,
        success: true,
        review: action.payload,
      };
    case REVIEW_GET_FAIL:
      return { loading: false, error: action.payload };
    case REVIEW_GET_RESET:
      return { loading: false, success: false, error: false};
    default:
      return state;
  }
};