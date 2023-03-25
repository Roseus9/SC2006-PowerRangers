// Reducer takes in the state and an action and returns a new state

//  IMPORTING CONSTANTS ----------------
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/constants'
//---------------------------------------

//  INITIAL STATE OF USER ----------------
const userInitialState = {
  loading: false,
  userInfo: {},
  error: '',  
}

// REDUCERS ----------------
// Reducer for getting a list of products
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
      return { }
      // if none of the above, return the initial state
    default:
      return state
  }
}

