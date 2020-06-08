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
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
    case USER_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        post: null,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case DISLIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id
            ? { ...post, dislikes: payload.dislikes }
            : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case CREATE_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
      };
    case LIKE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === payload.commentId
              ? { ...comment, likes: payload.likes }
              : comment
          ),
        },
        loading: false,
      };
    case DISLIKE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.map((comment) =>
            comment._id === payload.commentId
              ? { ...comment, dislikes: payload.dislikes }
              : comment
          ),
        },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};
