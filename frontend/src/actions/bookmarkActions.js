import axios from "axios";
import {
  BOOKMARK_INDIV_SEARCH_REQUEST,
  BOOKMARK_INDIV_SEARCH_SUCCESS,
  BOOKMARK_INDIV_SEARCH_FAIL,
  BOOKMARK_INDIV_SEARCH_ERROR,
  BOOKMARK_CREATE_REQUEST,
  BOOKMARK_CREATE_SUCCESS,
  BOOKMARK_CREATE_FAIL,
  BOOKMARK_DELETE_REQUEST,
  BOOKMARK_DELETE_SUCCESS,
  BOOKMARK_DELETE_FAIL,
} from "../constants/constants";

export const getBookmark = (pid, uid) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKMARK_INDIV_SEARCH_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/checkbookmark/${pid}/${uid}`);

    if (Object.keys(data).length == 0)
      dispatch({
        type: BOOKMARK_INDIV_SEARCH_FAIL,
        payload: data,
      });
    else
      dispatch({
        type: BOOKMARK_INDIV_SEARCH_SUCCESS,
        payload: data,
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
