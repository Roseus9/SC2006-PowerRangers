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
} from '../constants/constants'
//---------------------------------------

// ACTION CREATORS ----------------
//  Action creator for loggin in a user
//  takes in username and passsword
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

  

