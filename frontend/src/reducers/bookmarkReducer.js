import {
  BOOKMARK_INDIV_SEARCH_REQUEST,
  BOOKMARK_INDIV_SEARCH_SUCCESS,
  BOOKMARK_INDIV_SEARCH_FAIL,
  BOOKMARK_INDIV_SEARCH_ERROR,
  BOOKMARK_CHANGE_REQUEST,
  BOOKMARK_CHANGE_REMOVE_SUCCESS,
  BOOKMARK_CHANGE_ADD_SUCCESS,
  BOOKMARK_CHANGE_FAIL,
  BOOKMARK_CHANGE_RESET,
  BOOKMARK_INDIV_SEARCH_RESET,
  BOOKMARK_FIND_REQUEST,
  BOOKMARK_FIND_SUCCESS,
  BOOKMARK_FIND_FAIL,
  BOOKMARK_FIND_RESET,
} from "../constants/constants";

const getBookmarkInitialState = {
  flag: null,
  loading: false,
  error: [],
  done: false,
};

const changeBookmarkInitialState = {
  newFlag: null,
  loading: false,
  error: [],
  done: false,
};

const findBookmarkInitialState = {
  loading: false,
  error: [],
  done: false,
  count: null,
};
export const getBookmarkReducer = (state = getBookmarkInitialState, action) => {
  switch (action.type) {
    case BOOKMARK_INDIV_SEARCH_REQUEST:
      return { loading: true, error: [], done: false };
    case BOOKMARK_INDIV_SEARCH_SUCCESS:
      return { flag: true, loading: false, error: [], done: true };
    case BOOKMARK_INDIV_SEARCH_FAIL:
      return { flag: false, loading: false, error: [], done: true };
    case BOOKMARK_INDIV_SEARCH_ERROR:
      return { loading: false, error: action.payload };
    case BOOKMARK_INDIV_SEARCH_RESET:
      return { flag: null, loading: false, error: [], done: false };
    default:
      return state;
  }
};

export const changeBookmarkReducer = (
  state = changeBookmarkInitialState,
  action
) => {
  switch (action.type) {
    case BOOKMARK_CHANGE_REQUEST:
      return { loading: true, error: [], done: false };
    case BOOKMARK_CHANGE_REMOVE_SUCCESS:
      return { newFlag: false, loading: false, done: true };
    case BOOKMARK_CHANGE_ADD_SUCCESS:
      return { newFlag: true, loading: false, done: true };
    case BOOKMARK_CHANGE_FAIL:
      return { loading: false, error: action.payload };
    case BOOKMARK_CHANGE_RESET:
      return { loading: false, error: [], newFlag: null, done: false };
    default:
      return state;
  }
};

export const findBookmarkReducer = (
  state = findBookmarkInitialState,
  action
) => {
  switch (action.type) {
    case BOOKMARK_FIND_REQUEST:
      return { loading: true, error: [], done: false };
    case BOOKMARK_FIND_SUCCESS:
      return { loading: false, done: true, count: action.payload };
    case BOOKMARK_FIND_FAIL:
      return { loading: false, error: action.payload };
    case BOOKMARK_FIND_RESET:
      return { loading: false, error: [], done: false, count: null };
    default:
      return state;
  }
};
