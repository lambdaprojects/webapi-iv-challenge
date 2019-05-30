import axios from "axios";

export const GET_POSTS_START = "GET_POSTS_START";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILED = "GET_POSTS_FAILED";

export const URL = "http://localhost:8000/api/posts";

export const getPosts = () => dispatch => {
  dispatch({ type: GET_POSTS_START });
  axios
    .get(URL)
    .then(res => {
      console.log(
        ":: RESPONSE DATA FOR GET POSTS IS :: " + JSON.stringify(res)
      );
      dispatch({
        type: GET_POSTS_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(":: GET POSTS ERROR IS :: " + JSON.stringify(err));
      dispatch({
        type: GET_POSTS_FAILED,
        payload: err
      });
    });
};
