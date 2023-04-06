import {
  BOOKMARK_INDIV_SEARCH_REQUEST,
  BOOKMARK_INDIV_SEARCH_SUCCESS,
  BOOKMARK_INDIV_SEARCH_FAIL,
  BOOKMARK_INDIV_SEARCH_ERROR,
} from "../constants/constants";

const BookmarkInitialState = {
  flag: false,
  loading: false,
  error: [],
};

export const BookmarkReducer = (state = BookmarkInitialState, action) => {
  switch (action.type) {
    case BOOKMARK_INDIV_SEARCH_REQUEST:
      return { loading: true, error: [] };
    case BOOKMARK_INDIV_SEARCH_SUCCESS:
      return { flag: true, loading: false, error: [] };
    case BOOKMARK_INDIV_SEARCH_FAIL:
      return { flag: false, loading: false, error: [] };
    case BOOKMARK_INDIV_SEARCH_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
