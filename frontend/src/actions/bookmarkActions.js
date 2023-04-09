import axios from "axios";
import {
  BOOKMARK_INDIV_SEARCH_REQUEST,
  BOOKMARK_INDIV_SEARCH_SUCCESS,
  BOOKMARK_INDIV_SEARCH_FAIL,
  BOOKMARK_INDIV_SEARCH_ERROR,
  BOOKMARK_CHANGE_REQUEST,
  BOOKMARK_CHANGE_REMOVE_SUCCESS,
  BOOKMARK_CHANGE_ADD_SUCCESS,
  BOOKMARK_CHANGE_FAIL,
  BOOKMARK_FIND_REQUEST,
  BOOKMARK_FIND_SUCCESS,
  BOOKMARK_FIND_FAIL,
  BOOKMARK_FIND_USER_REQUEST,
  BOOKMARK_FIND_USER_SUCCESS,
  BOOKMARK_FIND_USER_FAIL,
} from "../constants/constants";

export const getBookmarkAction = (pid, uid) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKMARK_INDIV_SEARCH_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/checkbookmark/${pid}/${uid}`);
    const { flag } = data;
    console.log("flag", flag);
    if (!flag)
      dispatch({
        type: BOOKMARK_INDIV_SEARCH_FAIL,
      });
    else
      dispatch({
        type: BOOKMARK_INDIV_SEARCH_SUCCESS,
      });
  } catch (error) {
    dispatch({
      type: BOOKMARK_INDIV_SEARCH_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeBookmarkAction =
  (pid, uid, flag) => async (dispatch, getState) => {
    try {
      dispatch({ type: BOOKMARK_CHANGE_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/changebookmark/${pid}/${uid}/${flag}`
      );
      const { newFlag } = data;
      if (newFlag) {
        dispatch({ type: BOOKMARK_CHANGE_ADD_SUCCESS });
      } else {
        dispatch({ type: BOOKMARK_CHANGE_REMOVE_SUCCESS });
      }
    } catch (error) {
      dispatch({
        type: BOOKMARK_CHANGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const findBookmarks = (pid) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKMARK_FIND_REQUEST });
    const { data } = await axios.get(`/api/findbookmarks/${pid}`);
    const { count } = data;
    dispatch({ type: BOOKMARK_FIND_SUCCESS, payload: count });
  } catch (error) {
    dispatch({
      type: BOOKMARK_FIND_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const findUserBookmarks = (uid) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKMARK_FIND_USER_REQUEST });
    const { data } = await axios.get(`/api/finduserbookmarks/${uid}`);
    dispatch({ type: BOOKMARK_FIND_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: BOOKMARK_FIND_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
