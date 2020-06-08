import {
  GET_POSTS,
  CREATE_POST,
  POST_ERROR,
  GET_POST,
  USER_POSTS,
  DELETE_POST,
  CREATE_COMMENT,
  DISLIKE_POST,
  LIKE_POST,
  LIKE_COMMENT,
  DISLIKE_COMMENT,
  DELETE_COMMENT,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get all posts

export const getAllPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get single post by id

export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Get current users posts

export const userPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts/user_posts');

    dispatch({
      type: USER_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Create post

export const createPost = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/posts', formData);

    console.log(res.data);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'Success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Like post

export const likePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);

    dispatch({
      type: LIKE_POST,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Dislike post

export const dislikePost = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/dislike/${id}`);
    console.log(res.data);

    dispatch({
      type: DISLIKE_POST,
      payload: { id, dislikes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete post

export const deletePost = (id) => async (dispatch) => {
  if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      await axios.delete(`/api/posts/${id}`);

      dispatch({
        type: DELETE_POST,
        payload: id,
      });

      dispatch(setAlert('Post removed', 'Success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};

// Create comment

export const createComment = (formData, id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/comment/${id}`, formData);

    dispatch({
      type: CREATE_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Like comment

export const likeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}/${commentId}`);

    dispatch({
      type: LIKE_COMMENT,
      payload: { commentId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Dislike comment

export const dislikeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/dislike/${postId}/${commentId}`);

    dispatch({
      type: DISLIKE_COMMENT,
      payload: { commentId, dislikes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete comment

export const deleteComment = (postId, commentId) => async (dispatch) => {
  if (window.confirm('Are you sure you want to delete this comment?')) {
    try {
      await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });

      dispatch(setAlert('Comment removed', 'Success'));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  }
};
