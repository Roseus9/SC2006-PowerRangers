// Reducer takes in the state and an action and returns a new state

//  IMPORTING CONSTANTS ----------------
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOGIN_RESET,

  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,

  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from '../constants/constants'
//---------------------------------------

//  INITIAL STATE OF USER ----------------
const userInitialState = {
  loading: false,
  userInfo: {},
  error: '',  
}

// REDUCERS ----------------
// Reducer for logging/logging out a user
export const userLoginReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      // if succesful, return a payload of data with the products to the state
      return { loading: false, userInfo: action.payload }
      // if there is an error, return a new attribute error, passing in the response from the payload
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
      // if logout is successful   
    case USER_LOGOUT:
      return { logout: true}
    case USER_LOGIN_RESET:
      return { error : null, logout: false}
      // if none of the above, return the initial state
    default:
      return state
  }
}


// Reducer for registering a user
export const userRegisterReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      // if succesful, return a payload of data with the user to the state
      return { loading: false, success: true, userInfo: action.payload }
      // if there is an error, return a new attribute error, passing in the response from the payload
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_REGISTER_RESET:
      return { loading: false, success: false }
      // if logout is successful   
      // if none of the above, return the initial state
    default:
      return state
  }
}

// Reducer for getting user details
export const userDetailsReducer = (state = {}, action) => {
switch (action.type) {
  case USER_PROFILE_REQUEST:
    // here the spread operator means we include all the attributes of the initial state object into the return object
    return { loading: true }
  // we are not using userInfo here because we are not returning the user info, just the user object
  case USER_PROFILE_SUCCESS:
    return { loading: false, userObj: action.payload }
  // if there is an error, return a new attribute error, passing in the response from the payload
  case USER_PROFILE_FAIL:
    return { loading: false, error: action.payload }
  default:
    return state;
}

}


