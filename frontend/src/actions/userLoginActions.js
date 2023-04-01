import axios from 'axios'
// Becase we are using thunk middleware,
// our actions will return a function instead of an action object
// and each action will be taking in dispatch as a parameter

//  IMPORTING CONSTANTS ----------------
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,

  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,

  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,

  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL
} from '../constants/constants'
//---------------------------------------

// ACTION CREATORS ----------------
//  Action creator for logging in a user
//  takes in username and password
//  action object contains type of the action and payload
export const login = (username, password) => async (dispatch) => {
  try {

    dispatch({ type: USER_LOGIN_REQUEST })

    // add config to indicate that the data being sent via HTTP request body is in JSON format
    const config = {
      headers: {
          'Content-type': 'application/json'
      }
    }
    
    const { data } = await axios.post(
      '/api/users/login', 
      { 'username': username, 'password': password },
      config
    )

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({ 
      type: USER_LOGIN_FAIL, 
      payload: error.response && error.response.data.message
        ? error.response.data.message + ": Incorrect username or password"
        : error.message + ": Incorrect username or password"
    })
  }
}

//  Action creator for logging out a user
//  action object contains type of the action
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
}


//  Action creator for registering a user
//  takes in username and password
//  action object contains type of the action and payload
export const register = (name, username, email, password, telegram) => async (dispatch) => {
  try {

    dispatch({ type: USER_REGISTER_REQUEST })

    // add config to indicate that the data being sent via HTTP request body is in JSON format
    const config = {
      headers: {
          'Content-type': 'application/json'
      }
    }

    const { data } = await axios.post(
      '/api/users/register', 
      {'name': name, 'username': username, 'email': email, 'password': password, 'telegram' : telegram },
      config
    )

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data })

    localStorage.setItem('userInfo', JSON.stringify(data))

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

  } catch (error) {
    dispatch({ 
      type: USER_REGISTER_FAIL, 
      payload: error.response && error.response.data.message
        ? error.response.data.message + error.detail
        : error.message 
    })
  }
}

// Action creator for getting exact user details by ID
// takes in id
// action object contains type of the action and payload
// export const getUserDetails = (id) => async (dispatch, getState) => {
//   try {

//     dispatch({ type: USER_DETAILS_REQUEST })

//     // get user login info from local storage
//     const { userLogin: { userInfo } } = getState()

//     // add config to indicate that the data being sent via HTTP request body is in JSON format
//     const config = {
//       headers: {
//           'Content-type': 'application/json',
//           Authorization: `Bearer ${userInfo.token}`
//       }
//     }
    
//     // we extract out the user data for that specific user id 
//     const { data } = await axios.get(
//       `/api/users/${id}`, 
//       config
//     )

//     dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

//   } catch (error) {
//     dispatch({ 
//       type: USER_DETAILS_FAIL, 
//       payload: error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message 
//     })
//   }
// }

//  Action creator for getting a single user profile via username
//  action object contains type and payload
export const getUserProfileView = (slug) => async (dispatch) => {
  try {
    dispatch({ type: USER_PROFILE_REQUEST });
    const { data } = await axios.get(`/api/profile/${slug}`);
    console.log("IDK WHAT IS THIS", data);
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}