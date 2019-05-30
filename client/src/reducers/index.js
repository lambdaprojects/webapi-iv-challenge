import {
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILED,
  GET_POSTS_START
} from "../actions";

const initialState = {
  fetchingPosts: false,
  posts: [],
  error: ""
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_START:
      return {
        ...state,
        error: "",
        fetchingPosts: true
      };

    case GET_POSTS_SUCCESS:
      console.log(":: GET POSTS SUCCESS ::" + JSON.stringify(action.payload));
      return {
        ...state,
        posts: action.payload,
        fetchingPosts: false
      };

    case GET_POSTS_FAILED:
      return {
        ...state,
        error: action.payload,
        fetchingPosts: false
      };
    default: {
      return state;
    }
  }
}
export default reducer;
